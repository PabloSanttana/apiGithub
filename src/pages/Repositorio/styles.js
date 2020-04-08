import styled from 'styled-components'
import {Link} from 'react-router-dom'


export const Loading = styled.div`
    color:#fff;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
`;

export const BackButton = styled(Link)`

    border:0;
    outline:0;
    background: transparent;

`;


export const Container = styled.div`
  max-width:700px;
   background:#fff;
   border-radius: 4px;
   padding: 30px;
   margin: 80px auto;
   box-shadow: 0 0 20px rgba(0,0,0,0.2);

`;

export const Owner = styled.header`
    display:flex;
    align-items:center;
    flex-direction:column;
    img{
        width:150px;
        border-radius: 20%;
        margin: 20px 0;
    }
    h1{
        font-size: 30px;
        color:#0d2636;
    }
    p{
        margin-top: 5px;
        font-size: 14px;
        color:#000;
        text-align: center;
        line-height:1.4;
        max-width: 400px;
    }
`;

export const IssuesList = styled.ul`
    margin-top: 30px;
    padding-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li{
        display:flex;
        padding: 15px 10px;
        & + li {
            margin-top: 12px;
        }
        img{
        width: 40px;
        height: 40px;
        border-radius:50%;
        border: 2px solid #0d2636;

    }
    div{
        flex:1;
        margin-left: 12px;

        p{
            color: #000;
            margin-top: 10px;
            font-size: 12px
        }

    }
    strong{
        font-size: 15px;

        a{
            text-decoration:none;
            color:#222;
            transition: 0.3s;

            &:hover{
                color: #0071db
            }
        }

        span{
            background:#222;
            color:#fff;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            padding: 5px 7px;
             margin-left: 10px;
        }

    }


    }
   
`;

export const PageActions = styled.div`

    display: flex;
    justify-content: space-between;
    align-items:center;

    button{
        outline:0;
        border:0;
        background: #222;
        color: #fff;
        padding: 5px 10px;
        border-radius: 4px;
        &[disabled]{
            background: #ddd;
            cursor: not-allowed;
        }

    }
`;

export const FilterActions = styled.div`
    display: flex;
    align-items:center;
    margin-top:20px;
    button{
        outline:0;
        border:0;
        background: #575555;
        margin-left: 8px;
        color: #fff;
        padding: 5px 10px;
        border-radius: 4px;
        &[disabled]{
            background: #00a4ff;
            font-weight:600;
           
        }

    }

`;
