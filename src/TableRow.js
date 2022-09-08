import React from 'react'

const TableRow = ({ id, userId, title, completed }) => {
    return (
        <>
            <tr>
                <td style={{textAlign: 'center'}}>{id}</td>
                <td style={{textAlign: 'center'}}>{userId}</td>
                <td>{title}</td>
                <td style={{textAlign: 'center'}}>{completed ? 'true':'false'}</td>
            </tr>
        </>
    )
}

export default TableRow