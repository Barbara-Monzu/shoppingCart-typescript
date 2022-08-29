import styled from 'styled-components';

export const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
width: 100%;
height: 100%;
border: 1px solid lightblue;
border-radius: 20px;

  img {
    max-height: 150px;
    object-fit: cover;
    border-radius: 20px 20px 0 0;
}

button {
    border-radius: 0 0 20px 20px;
    width: 100%;
}


div {
    font-family: Helvetica, Arial, sans-serif;
    padding: 10px;
    height: 100%;
}

`;
