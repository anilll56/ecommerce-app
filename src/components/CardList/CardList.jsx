import React from 'react'
import { Link } from 'react-router-dom'
import './CardList.css'
import Card from '../card/Card'

const CardList = ({ products }) => {

    return (
        <section className="product-list">
            <div className="product-cards">
                {products.map((product, index) => (
                    <Card Item={product} key={index} />
                ))}
            </div>
        </section>
    )
}

export default CardList