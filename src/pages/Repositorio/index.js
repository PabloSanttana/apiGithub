import React,{ useState, useEffect} from 'react'
import { FaArrowLeft, FaFilter} from 'react-icons/fa'

import {Container,Owner,Loading,BackButton,IssuesList,PageActions,FilterActions} from './styles'
import api from '../../services/api'
export default function Repositorio({match}) {

    const [repositorio, setRepositorio] = useState({})
    const [issues, setIssues] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState('open')


    useEffect(()=>{

        async function load(){
            const nomeReposit = decodeURIComponent(match.params.parametro);

            const [repositorioData,issuesData] = await Promise.all([
                api.get(`repos/${nomeReposit}`),
                api.get(`repos/${nomeReposit}/issues`, {
                    params:{
                        state: 'open',
                        per_page:5
                    }
                }),
            ])
            setRepositorio(repositorioData.data)
            setIssues(issuesData.data)
            setLoading(false)
        }

        load();
    },[match.params.parametro]);

    useEffect(()=>{

        async function loadIssue(){
            const nomeReposit = decodeURIComponent(match.params.parametro);

         const response = await   api.get(`repos/${nomeReposit}/issues`, {
                params:{
                        state: filter,
                        page,
                        per_page:5
                         }
                });
             setIssues(response.data)
        }
        loadIssue();
    },[match.params.parametro, page, filter])

    function  handlePage(action){

        setPage(action === 'back' ? page -1 : page + 1)

    }
    function handleFilter(filt){

        setFilter(filt)

    }


    if(loading){
        return(
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        )
    }

    return (
        <Container>
            <BackButton to="/">
                <FaArrowLeft size={35} color="#0d2636"/>
            </BackButton>
                <Owner>
                    <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login}/>
                    <h1>{repositorio.name}</h1>
                    <p>{repositorio.description}</p>
                </Owner>
                <FilterActions>
                    <FaFilter size={20} color='#0d2636'/>
                <button type="button" disabled={filter === 'open'} onClick={()=> handleFilter('open')} >Open</button>
                <button type="button" disabled={filter === 'all'} onClick={()=> handleFilter('all')} >All</button>
                <button type="button" disabled={filter === 'closed'} onClick={()=> handleFilter('closed')}>closed</button>
                </FilterActions>
               
            <IssuesList>
                {issues.map(issue =>(
                    <li key={String(issue.id)}>
                        <img src={issue.user.avatar_url} alt={issue.user.login}/>

                        <div>
                            <strong>
                                <a href={issue.html_url}>{issue.title}</a>
                                {issue.labels.map(label=>(
                                    <span key={String(label.id)}>{label.name}</span>
                                ))}
                            </strong>
                            <p>{issue.user.login}</p>
                        </div>
                    </li>
                ))}
            </IssuesList>

            <PageActions>

                <button type="button" disabled={page === 1} onClick={()=> handlePage('back')}>Back</button>
                <button type="button" onClick={()=> handlePage('next')}>Next</button>

            </PageActions>


        </Container>
            
       
    )
}
