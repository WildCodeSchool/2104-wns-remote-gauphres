import styled from 'styled-components';
import { colors, fonts } from '../../style/theme';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${colors.white};
    border: 1px solid ${colors.light};
    border-radius: 1em;
    width: 80%;
    height: 80vh;
    overflow-y: auto;
    ::-webkit-scrollbar {
        width: 14px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${colors.yellow};
        border-radius: 20px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;

type BubbleMessageProps = { isMe: boolean };

export const BubbleMessage = styled.div<BubbleMessageProps>`
    background-color: ${(props) =>
        props.isMe ? colors.purple : colors.yellow};
    color: ${(props) => (props.isMe ? colors.white : colors.darkPurple)};
    align-self: ${(props) => (props.isMe ? 'flex-end' : 'flex-start')};
    border-radius: 1em;
    padding: 1em;
    margin: 0.5em 1em 0.5em 1em;
    font-family: ${fonts.text};
    font-weight: bold;
    max-width: 80%;
    overflow-wrap: break-word;
`;
