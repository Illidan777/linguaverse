package com.gorbasenko245.linguaverse_backend.service.impl;

import com.gorbasenko245.linguaverse_backend.domain.dto.term.TermDto;
import com.gorbasenko245.linguaverse_backend.domain.entity.module.Module;
import com.gorbasenko245.linguaverse_backend.domain.entity.term.Term;
import com.gorbasenko245.linguaverse_backend.domain.enums.TermStatus;
import com.gorbasenko245.linguaverse_backend.domain.exception.common.ResourceNotFoundException;
import com.gorbasenko245.linguaverse_backend.domain.exception.common.ValidationException;
import com.gorbasenko245.linguaverse_backend.mapper.TermMapper;
import com.gorbasenko245.linguaverse_backend.repository.TermRepository;
import com.gorbasenko245.linguaverse_backend.service.ITermService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * Service class for managing Term entities.
 * Provides business logic for creating, updating, deleting, and retrieving terms.
 */
@RequiredArgsConstructor
@Service
public class TermService implements ITermService {

    // Repository for accessing Term entities in the database
    private final TermRepository termRepository;

    // Mapper for converting Term entities to their corresponding DTOs
    private final TermMapper termMapper;

    /**
     * Fetches a list of terms for a specific module.
     *
     * @param moduleId The ID of the module for which to fetch terms.
     * @return A list of TermDto objects representing the terms of the given module.
     * @throws ValidationException if the moduleId is null.
     */
    @Override
    public List<TermDto> getTermsByModuleId(final Long moduleId) {
        if (Objects.isNull(moduleId)) {
            throw new ValidationException("Required fields are missing!");
        }
        return termRepository.findAllByModuleIdOrdered(moduleId).stream()
                .map(termMapper::toTermDto)
                .collect(Collectors.toList());
    }

    /**
     * Creates a new term in the specified module.
     *
     * @param orderNumber The order number for the new term.
     * @param module The module to which the new term belongs.
     * @return The TermDto of the newly created term.
     * @throws ValidationException if the module is null.
     */
    @Transactional
    @Override
    public TermDto createTerm(final Long orderNumber, final Module module) {
        if (Objects.isNull(module)) {
            throw new ValidationException("Required fields are missing!");
        }

        final List<Term> moduleTerms = module.getTerms(); // Get the terms of the module

        final Term newTerm = new Term();  // Create a new term
        newTerm.setTerm("Initial term");
        newTerm.setDefinition("Initial definition");
        newTerm.setModule(module);

        // Set the order number for the new term
        if (Objects.isNull(orderNumber)) {
            if(moduleTerms.isEmpty()) { // First term gets order number 1
                newTerm.setOrderNumber(1L);
            } else  { // Set order number after last term
                newTerm.setOrderNumber(moduleTerms.get(moduleTerms.size() - 1).getOrderNumber() + 1);
            }
        } else {
            // Shift the order numbers of existing terms to make room for the new one
            for (Term term : moduleTerms) {
                if (term.getOrderNumber() >= orderNumber) {
                    term.setOrderNumber(term.getOrderNumber() + 1);
                }
            }
            newTerm.setOrderNumber(orderNumber);
        }

        moduleTerms.add(newTerm); // Add new term to the module's list of terms

        final Term savedTerm = termRepository.save(newTerm); // Save the new term
        termRepository.saveAll(moduleTerms); // Save all terms of the module

        return termMapper.toTermDto(savedTerm);
    }

    /**
     * Updates an existing term's details.
     *
     * @param moduleId The ID of the module to which the term belongs.
     * @param termId The ID of the term to update.
     * @param termDto The updated term data.
     * @return The updated TermDto.
     * @throws ValidationException if required fields are missing or invalid.
     */
    @Transactional
    @Override
    public TermDto updateTerm(final Long moduleId, final Long termId, final TermDto termDto) {
        if (Objects.isNull(termDto) || Objects.isNull(termDto.getOrderNumber())) {
            throw new ValidationException("Required fields are missing!");
        }

        final Term currentTerm = this.getById(termId); // Fetch the current term
        final List<Term> moduleTerms = termRepository.findAllByModuleIdOrdered(moduleId); // Get all terms of the module

        final Long newOrderNumber = termDto.getOrderNumber(); // Get the new order number for the term
        final Long currentOrderNumber = currentTerm.getOrderNumber();

        // Update the term with the new data
        final Term termToUpdate = termMapper.toTerm(currentTerm, termDto);
        termToUpdate.setOrderNumber(newOrderNumber);

        if (!Objects.equals(newOrderNumber, currentOrderNumber)) {
            // Adjust the order numbers of other terms in the module
            for (Term term : moduleTerms) {
                Long order = term.getOrderNumber();
                if (!Objects.equals(term.getId(), termId)) {
                    if (newOrderNumber < currentOrderNumber && order >= newOrderNumber && order < currentOrderNumber) {
                        // Shift the term up
                        term.setOrderNumber(order + 1);
                    } else if (newOrderNumber > currentOrderNumber && order > currentOrderNumber && order <= newOrderNumber) {
                        // Shift the term down
                        term.setOrderNumber(order - 1);
                    }
                }
            }
            termRepository.saveAll(moduleTerms); // Save all adjusted terms
        }

        return termMapper.toTermDto(termRepository.save(termToUpdate));
    }

    /**
     * Deletes a term by its ID from the specified module.
     *
     * @param moduleId The ID of the module from which to delete the term.
     * @param termId The ID of the term to delete.
     * @throws ValidationException if the termId is null.
     */
    @Transactional
    @Override
    public void deleteTerm(final Long moduleId, final Long termId) {
        if (Objects.isNull(termId)) {
            throw new ValidationException("Id cannot be null");
        }
        termRepository.deleteById(termId); // Delete the term by its ID

        // Get the terms of the module
        final List<Term> moduleTerms = termRepository.findAllByModuleIdOrdered(moduleId);

        moduleTerms.removeIf(term -> term.getId().equals(termId)); // Remove the deleted term from the module's list
        this.updateTermOrderNumberInModule(moduleTerms); // Update the order numbers of the remaining terms
    }

    /**
     * Randomly shuffles the terms of a specific module.
     *
     * @param moduleId The ID of the module to shuffle terms for.
     */
    @Transactional
    @Override
    public void shuffleByModuleId(final Long moduleId) {
        // Fetch terms
        final List<Term> moduleTerms = termRepository.findAllByModuleIdOrdered(moduleId);

        Collections.shuffle(moduleTerms); // Shuffle the terms randomly

        // Update the order numbers of the shuffled terms
        List<Term> updatedOrderNumber = IntStream
                .range(0, moduleTerms.size())
                .mapToObj(i -> {
                    final Term term = moduleTerms.get(i);
                    term.setOrderNumber((long) i + 1); // Set new order number by index
                    return term;
                })
                .toList();
        termRepository.saveAll(updatedOrderNumber); // Save shuffled terms
    }

    /**
     * Retrieves a term by its ID.
     *
     * @param id The ID of the term to retrieve.
     * @return The Term object corresponding to the provided ID.
     * @throws ValidationException if the ID is null or if the term is not found.
     */
    @Override
    public Term getById(final Long id) {
        if (Objects.isNull(id)) {
            throw new ValidationException("Id cannot be null");
        }
        return termRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Term does not exist by id: %d", id), "This term does not exist!"));
    }

    /**
     * Updates the order numbers of terms in a module.
     *
     * @param terms The list of terms to update.
     */
    private void updateTermOrderNumberInModule(final List<Term> terms) {
        final List<Term> updatedTerms = terms.stream()
                .sorted(Comparator.comparingInt(term -> term.getOrderNumber().intValue())) // Sort terms by their order number
                .peek(term -> term.setOrderNumber(Integer.valueOf(terms.indexOf(term)).longValue() + 1)) // Update the order numbers
                .collect(Collectors.toList());
        termRepository.saveAll(updatedTerms);
    }
}
