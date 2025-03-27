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

@RequiredArgsConstructor
@Service
public class TermService implements ITermService {

    private final TermRepository termRepository;
    private final TermMapper termMapper;

    @Override
    public List<TermDto> getTermsByModuleId(final Long moduleId) {
        if (Objects.isNull(moduleId)) {
            throw new ValidationException("Required fields are missing!");
        }
        return termRepository.findAllByModuleIdOrdered(moduleId).stream()
                .map(termMapper::toTermDto)
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public TermDto createTerm(final Long orderNumber, final Module module) {
        if (Objects.isNull(module)) {
            throw new ValidationException("Required fields are missing!");
        }

        final List<Term> moduleTerms = module.getTerms();

        final Term newTerm = new Term();
        newTerm.setTerm("Initial term");
        newTerm.setDefinition("Initial definition");
        newTerm.setModule(module);
        if (Objects.isNull(orderNumber)) {
            if(moduleTerms.isEmpty()) {
                newTerm.setOrderNumber(1L);
            } else  {
                newTerm.setOrderNumber(moduleTerms.get(moduleTerms.size() - 1).getOrderNumber() + 1);
            }
        } else {
            for (Term term : moduleTerms) {
                if (term.getOrderNumber() >= orderNumber) {
                    term.setOrderNumber(term.getOrderNumber() + 1);
                }
            }
            newTerm.setOrderNumber(orderNumber);
        }

        moduleTerms.add(newTerm);

        final Term savedTerm = termRepository.save(newTerm);
        termRepository.saveAll(moduleTerms);

        return termMapper.toTermDto(savedTerm);
    }

    @Transactional
    @Override
    public TermDto updateTerm(final Long moduleId, final Long termId, final TermDto termDto) {
        if (Objects.isNull(termDto) || Objects.isNull(termDto.getOrderNumber())) {
            throw new ValidationException("Required fields are missing!");
        }

        final Term currentTerm = this.getById(termId);
        final List<Term> moduleTerms = termRepository.findAllByModuleIdOrdered(moduleId);

        final Long newOrderNumber = termDto.getOrderNumber();
        final Long currentOrderNumber = currentTerm.getOrderNumber();

        // Обновляем сам терм со всеми изменениями
        final Term termToUpdate = termMapper.toTerm(currentTerm, termDto);
        termToUpdate.setOrderNumber(newOrderNumber);

        if (!Objects.equals(newOrderNumber, currentOrderNumber)) {
            // Обновляем порядковые номера остальных термов
            for (Term term : moduleTerms) {
                Long order = term.getOrderNumber();
                if (!Objects.equals(term.getId(), termId)) {
                    if (newOrderNumber < currentOrderNumber && order >= newOrderNumber && order < currentOrderNumber) {
                        // Сдвигаем вверх (увеличиваем порядковый номер)
                        term.setOrderNumber(order + 1);
                    } else if (newOrderNumber > currentOrderNumber && order > currentOrderNumber && order <= newOrderNumber) {
                        // Сдвигаем вниз (уменьшаем порядковый номер)
                        term.setOrderNumber(order - 1);
                    }
                }
            }
            termRepository.saveAll(moduleTerms);
        }

        return termMapper.toTermDto(termRepository.save(termToUpdate));
    }

    @Transactional
    @Override
    public void deleteTerm(final Long moduleId, final Long termId) {
        if (Objects.isNull(termId)) {
            throw new ValidationException("Id cannot be null");
        }
        termRepository.deleteById(termId);

        final List<Term> moduleTerms = termRepository.findAllByModuleIdOrdered(moduleId);

        moduleTerms.removeIf(term -> term.getId().equals(termId));
        this.updateTermOrderNumberInModule(moduleTerms);
    }

    @Transactional
    @Override
    public void shuffleByModuleId(final Long moduleId) {
        final List<Term> moduleTerms = termRepository.findAllByModuleIdOrdered(moduleId);

        Collections.shuffle(moduleTerms);

        List<Term> updatedOrderNumber = IntStream
                .range(0, moduleTerms.size())
                .mapToObj(i -> {
                    final Term term = moduleTerms.get(i);
                    term.setOrderNumber((long) i + 1);
                    return term;
                })
                .toList();
        termRepository.saveAll(updatedOrderNumber);
    }

    @Override
    public Term getById(final Long id) {
        if (Objects.isNull(id)) {
            throw new ValidationException("Id cannot be null");
        }
        return termRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Term does not exist by id: %d", id), "This term does not exist!"));
    }

    private void updateTermOrderNumberInModule(final List<Term> terms) {
        final List<Term> updatedTerms = terms.stream()
                .sorted(Comparator.comparingInt(term -> term.getOrderNumber().intValue()))
                .peek(term -> term.setOrderNumber(Integer.valueOf(terms.indexOf(term)).longValue() + 1))
                .collect(Collectors.toList());
        termRepository.saveAll(updatedTerms);
    }
}
