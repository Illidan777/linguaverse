const people = [
    { name: "Alice", city: "New York" },
    { name: "Bob", city: "Los Angeles" },
    { name: "Charlie", city: "New York" },
    { name: "David", city: "Los Angeles" },
    { name: "Eve", city: "Chicago" }
];

const groupedByCity = people.reduce((acc, person) => {
    const { city } = person;
    if (!acc[city]) {
        acc[city] = [];
    }
    acc[city].push(person);
    return acc;
}, {});

console.log(groupedByCity);
