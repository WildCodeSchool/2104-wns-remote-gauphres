import jwtDecode, { JwtPayload } from 'jwt-decode';

interface DecodedToken extends JwtPayload {
    userEmail: string;
}

const getUserEmailByToken = (token: string | null): string | null => {
    if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token);
        if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
            localStorage.removeItem('jwtToken');
            return null;
        }
        const { userEmail } = decodedToken;
        return userEmail;
    }
    return null;
};

export default getUserEmailByToken;
