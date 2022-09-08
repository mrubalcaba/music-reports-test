import React, { useContext, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import TableRow from './TableRow'
import { PageContext } from './App'

function addToData(data, element) {
    if (!data.includes(element)) {
        data.push(element);
    }
}

const DataTable = ({ userId, title }) => {
    const pageContext = useContext(PageContext);
    const { data } = pageContext;
    const [dataToShow, setDataToShow] = useState(null);

    useEffect(() => {
        let filteredData = [];
        if (data && (userId.toString() || title)) {
            for (let d of data) {
                if (userId.toString() && title) {
                    if (userId.toString() === d.userId.toString() && d.title.toLowerCase().includes(title.toLowerCase())) {
                        addToData(filteredData, d);
                    }
                }
                else {
                    if ((userId.toString().toLowerCase() === d.userId.toString().toLowerCase()) || (d.title.toLowerCase().includes(title.toLowerCase()) && title !== '')) {
                        addToData(filteredData, d);
                    }
                }
            }
        }
        else if (data) { //if both userId and title fields are blank
            filteredData = data;
        }

        setDataToShow(filteredData);
    }, [data, userId, title])

    return (
        <Table striped bordered hover variant='dark' className='mt-4'>
            <thead>
                <tr>
                    <th>ID #</th>
                    <th>User ID</th>
                    <th>Title</th>
                    <th>Completed</th>
                </tr>
            </thead>
            <tbody>
                {dataToShow && dataToShow.map((d) =>
                    <TableRow
                        id={d.id}
                        userId={d.userId}
                        title={d.title}
                        completed={d.completed}
                        key={d.id}
                    ></TableRow>
                )}
            </tbody>
        </Table>
    )
}

export default DataTable