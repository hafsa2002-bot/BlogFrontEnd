import styled from 'styled-components'
import React from 'react'

function EmailInput({email, setEmail}) {
  return (
    <StyledWrapper>
        <div className="input-group">
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                type="email"
                id="mail"
                name="mail"
                autoComplete="off"
                placeholder=" "
                className="input placeholder:text-black"
                required
            />
            <label htmlFor="mail" className="user-label bg-[]">Email</label>
        </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
    .input-group {
        position: relative;
    }

    .input {
        border: solid 1.5px #a1a1a1;
        border-radius: 1rem;
        background: none;
        width:100%;
        padding: 1rem;
        font-size: 1rem;
        color: black;
        transition: border 150ms cubic-bezier(0.4,0,0.2,1);
    }

    .user-label {
        position: absolute;
        left: 15px;
        color: #a1a1a1;
        pointer-events: none;
        transform: translateY(1rem);
        transition: 150ms cubic-bezier(0.4,0,0.2,1);
    }

    .input:focus, input:valid {
        outline: none;
        border: 1.5px solid #F27C3A;
    }

    .input:focus ~ .user-label,
    .input:not(:placeholder-shown) ~ .user-label {
        transform: translateY(-50%) scale(0.8);
        background-color: #FAF7F0;
        padding: 0.2em;
        color: #F27C3A;
}
`;

export default EmailInput
