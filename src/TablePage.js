import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Form, FormLabel, FormControl, FormGroup } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import DataTable from './DataTable'
import { PageContext } from './App'

const Background = styled.div`
    background: #212121;
    height: 100%;
    min-height: 100vh;
    padding-bottom: 4em;
`

const Container = styled.div`
    width: 80%;
    min-width: 425px;
    max-width: 1000px;
    height: 100%;
    margin: auto;
    position: relative;
    color: white;
    & > h5{
        width: fit-content;
        padding: 0.5em;
        background: #404040;
    }
    & > div{
        width: 80%;
    }
`

const NavButton = styled(Button)`
    position: absolute;
    height: 50px;
    min-width: 100px;
    max-width: 150px;
    right: 0;
    top: 7em;
`

const TableForm = styled(Form)`
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    margin-top: 2em;
    & > div {
        flex: 1;
        margin: auto;
        & > input{ 
            width: 80%;
            min-width: 100px; 
        }
        & > label{
            font-size: 1.5em;
        }
    }
`

const TablePage = ({ num }) => {
    const pageContext = useContext(PageContext);
    const nav = useNavigate();
    const page = { other: num === 1 ? 2 : 1, navTo: num === 1 ? '/form2' : '/' };
    const { userId, title } = num === 1 ? pageContext.page1 : pageContext.page2;
    return (
        <Background>
            <Container>
                <NavButton onClick={() => nav(page.navTo)}>{`To Page ${page.other}`}</NavButton>
                <h5>{`Page ${num}`}</h5>
                <div>
                    <TableForm>
                        <FormGroup controlId='userId'>
                            <FormLabel>User ID</FormLabel>
                            <FormControl
                                onChange={(e) => pageContext.dispatch({ page: num, type: 'UPDATE_USER_ID', value: e.target.value })}
                                type='text'
                                placeholder='User ID'
                                value={userId}
                            ></FormControl>
                        </FormGroup>
                        <FormGroup controlId='title'>
                            <FormLabel >Title</FormLabel>
                            <FormControl
                                onChange={(e) => pageContext.dispatch({ page: num, type: 'UPDATE_TITLE', value: e.target.value })}
                                type='text'
                                placeholder='Title'
                                value={title}
                            ></FormControl>
                        </FormGroup>
                    </TableForm>
                </div>
                <DataTable userId={userId} title={title}/>
            </Container>
        </Background>
    )
}

export default TablePage
