import {FaPepperHot as icon} from 'react-icons/fa'
export default {
    name: 'topping',
    title: 'Toppings',
    type: 'document',
    icon,
    fields: [
        {
            name: 'name',
            title: 'Pizza Name',
            type: 'string',
            description: 'What is the name of the topping?',
        },
        {
            name: 'vegetarian',
            title: 'Vegetarian',
            type: 'boolean',
            description: 'What is the name of the topping?',
            options: {
            layout: 'checkbox',
            },
        },
    ],
    preview: {
        select: {
            name: 'name',
            vegetarian: 'vegetarian',
        },
        // prepare: (fields) => ({
        //     title: `${fields.name} ${fields.vegetarian ? '' : ''}`,
        // }),
        prepare: ({ name, vegetarian }) => ({
            title: `${name} ${vegetarian ? '🌱' : ''}`,
        }),
    },
};