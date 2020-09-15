import React from 'react'
import './Table.scss';

export const Table = ({ countries }) => {
    return (
        <div className="table">
            {countries.map(({ country, cases }, index) => (
                <tr key={index.toString()}>
                    <td>{country}</td>
                    <td>
                        <strong>{cases}</strong>
                    </td>
                </tr>
            ))}

        </div>
    )
}
