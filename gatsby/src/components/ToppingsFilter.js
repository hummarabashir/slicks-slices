import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";

const ToppingsStyles = styled.div`
    display:flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 4rem;
    a {
        display: grid;
        padding: 5px;
        grid-template-columns: auto 1fr;
        grid-gap: 0 1rem;
        background: var(--grey);
        align-items: center;
        border-radius: 2px;
        text-decoration: none;
        font-size: clamp(1.5rem, 1.4vw, 2.5rem);
        .count {
            background: white;
            padding: 2px 5px;
        }
        &.active {
            background: var(--yellow);
        }
        &[aria-current='page'] {
            background: var(--yellow);
        }
    }
`;


function countPizzasInToppings(pizzas) {
    const counts = pizzas.map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
        const existingTopping = acc[topping.id];
        if(existingTopping) {
            existingTopping.count += 1;
        } else {
        acc[topping.id] = {
            id: topping.id,
            name: topping.name,
            count: 1,
        };
    }
        return acc;
    }, {});
    const sortedToppings = Object.values(counts).sort(
        (a,b) => b.count - a.count);
    return sortedToppings;
}

export default function ToppingsFilter({ activeTopping }) {
    const {toppings, pizzas} = useStaticQuery(graphql`
    query {
        toppings: allSanityTopping {
            nodes {
                name
                id
                vegetarian
            }
        }
        pizzas: allSanityPizza {
            nodes {
                toppings {
                    name
                    id
                }
            }
        }
    }
    `);
    console.clear();
    // console.log({toppings, pizzas});
    const toppingWithCounts = countPizzasInToppings(pizzas.nodes);
    // console.log(toppingWithCounts);
    return (
    <ToppingsStyles>
        {/* <p>Toppings</p> */}
        <Link to="/pizzas">
            <span className="name">All</span>
            <span className="count">{pizzas.nodes.length}</span>
        </Link>
        {toppingWithCounts.map((topping) => (
        <Link to={`/topping/${topping.name}`} key={topping.id} className= {topping.name === activeTopping ? 'active' : ''}>
            <span className="name">{topping.name}</span>
            <span className="count">{topping.count}</span>
        </Link>
        ))}
    </ToppingsStyles>
    );
}