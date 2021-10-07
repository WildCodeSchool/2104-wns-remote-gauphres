/* eslint-disable react/jsx-props-no-spreading */
import React, {
    ChangeEvent,
    CSSProperties,
    FC,
    FormEvent,
    useState,
} from 'react';
import { useForm } from 'react-hook-form';
import {
    Checkbox,
    InputAdornment,
    InputLabel,
    ListItemText,
    MenuItem,
    Step,
    StepLabel,
    Input,
    Chip,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import {
    Title,
    SubTitle,
    Container,
    Form,
    TextInput,
    InputDiv,
    Stepper,
    Select,
} from './style';
import Button from '../../Button/Button';

const CREATE_USER = gql`
    mutation createUser($newUser: UserCreationInput!) {
        createUser(newUser: $newUser) {
            email
        }
    }
`;

const LOGIN = gql`
    mutation Login($currentUser: UserLoginInput!) {
        Login(currentUser: $currentUser) {
            user {
                username
            }
        }
    }
`;

interface EyeIconProps {
    onClick: () => void;
    show: boolean;
    style: CSSProperties;
}

interface FormValues {
    username: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    birthDate: string;
    city: string;
    hobbies: string[];
}

const hobbiesList = ['football', 'tennis', 'basketball', 'golf'];

const steps = [
    'Informations de compte',
    'Informations personelles',
    'Tes hobbies',
];

const SignUpPage: FC = () => {
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [formStep, setFormStep] = useState(0);
    const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const {
        watch,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ mode: 'all' });
    const [createUser] = useMutation(CREATE_USER);
    const [login] = useMutation(LOGIN);

    const EyeIcon = ({ show, ...props }: EyeIconProps) => {
        if (show) {
            return <VisibilityOffIcon {...props} />;
        }
        return <VisibilityIcon {...props} />;
    };

    const handleChangeHobbies = (event: any) => {
        setSelectedHobbies(event.target.value);
    };

    const onSubmitForm = async (data: FormValues) => {
        const createResult = await createUser({
            variables: {
                newUser: {
                    ...data,
                },
            },
        });
        if (createResult.data.createUser) {
            const loginResult = await login({
                variables: {
                    currentUser: {
                        email: data.email,
                        password: data.password,
                    },
                },
            });
            if (loginResult.data.Login) history.push('/dashboard');
        }
    };

    const renderButton = () => {
        const handleClick = (e: any) => {
            e.preventDefault();
            setFormStep(formStep + 1);
        };
        if (formStep > 2) return null;
        if (formStep === 2)
            return (
                <Button
                    disabled={Object.values(errors).length > 0}
                    type="submit"
                >
                    Valider mes informations
                </Button>
            );
        return (
            <Button
                disabled={Object.values(errors).length > 0}
                type="button"
                onClick={(e: any) => handleClick(e)}
            >
                Etape suivante
            </Button>
        );
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmitForm)}>
                {formStep === 3 ? (
                    <div>
                        <Title>
                            Félicitations !!!
                            <span role="img" aria-label="rocket">
                                🚀
                            </span>
                        </Title>
                        <SubTitle>
                            Tu vas être redirigé vers ton dashboard dans
                            quelques instants
                        </SubTitle>
                    </div>
                ) : (
                    <>
                        <Title>Crée ton compte ! </Title>
                        <Stepper activeStep={formStep} alternativeLabel>
                            {steps.map((label, index) => (
                                <Step
                                    onClick={() => setFormStep(index)}
                                    key={label}
                                >
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </>
                )}
                {formStep === 0 && (
                    <InputDiv>
                        <TextInput
                            label="Pseudo"
                            variant="outlined"
                            error={errors.username}
                            helperText={
                                errors.username && errors.username.message
                            }
                            {...register('username', {
                                required: {
                                    value: true,
                                    message: 'Merci de renseigner un pseudo',
                                },
                            })}
                        />
                        <TextInput
                            label="Email"
                            variant="outlined"
                            error={errors.email}
                            helperText={errors.email && errors.email.message}
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: 'Merci de renseigner un email',
                                },
                            })}
                        />
                        <TextInput
                            label="Mot de passe"
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <EyeIcon
                                            show={showPassword}
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                            error={errors.password}
                            helperText={
                                errors.password && errors.password.message
                            }
                            {...register('password', {
                                pattern: {
                                    value: passwordRegex,
                                    message:
                                        'Merci de saisir un mot de passe valide. Celui-ci doit contenir au minimum 8 caractères avec au moins un chiffre, une lettre majuscule, une lettre minuscule et un caractère non alpha numérique.',
                                },
                                required: {
                                    value: true,
                                    message:
                                        'Merci de renseigner un mot de passe',
                                },
                            })}
                        />
                    </InputDiv>
                )}
                {formStep === 1 && (
                    <InputDiv>
                        <TextInput
                            label="Prénom"
                            variant="outlined"
                            error={errors.firstname}
                            helperText={
                                errors.firstname && errors.firstname.message
                            }
                            {...register('firstname', {
                                required: {
                                    value: true,
                                    message: 'Merci de renseigner un prénom',
                                },
                            })}
                        />
                        <TextInput
                            label="Nom"
                            variant="outlined"
                            error={errors.lastname}
                            helperText={
                                errors.lastname && errors.lastname.message
                            }
                            {...register('lastname', {
                                required: {
                                    value: true,
                                    message: 'Merci de renseigner un nom',
                                },
                            })}
                        />
                        <TextInput
                            label="Date de naissance"
                            variant="outlined"
                            error={errors.birthDate}
                            helperText={
                                errors.birthDate && errors.birthDate.message
                            }
                            {...register('birthDate', {
                                required: {
                                    value: true,
                                    message:
                                        'Merci de renseigner une date de naissance',
                                },
                            })}
                        />
                        <TextInput
                            label="Ville"
                            variant="outlined"
                            error={errors.city}
                            helperText={errors.city && errors.city.message}
                            {...register('city', {
                                required: {
                                    value: true,
                                    message: 'Merci de renseigner une ville',
                                },
                            })}
                        />
                    </InputDiv>
                )}
                {formStep === 2 && (
                    <InputDiv>
                        <InputLabel id="hobbies-mutiple-checkbox-label">
                            Hobbies
                        </InputLabel>
                        <Select
                            multiple
                            label="Hobbies"
                            name="Hobbies"
                            value={selectedHobbies}
                            onChange={handleChangeHobbies}
                            input={<Input />}
                            inputProps={{
                                inputRef: (ref: any) => {
                                    register('hobbies', {
                                        value: ref?.value,
                                    });
                                },
                            }}
                            renderValue={(hobbiesArray) => (
                                <div>
                                    {(hobbiesArray as string[]).map(
                                        (hobbie: string) => {
                                            const uppercaseHobbie =
                                                hobbie.charAt(0).toUpperCase() +
                                                hobbie.slice(1);
                                            return (
                                                <Chip
                                                    key={uppercaseHobbie}
                                                    label={uppercaseHobbie}
                                                />
                                            );
                                        }
                                    )}
                                </div>
                            )}
                        >
                            {hobbiesList.map((hobby) => (
                                <MenuItem key={hobby} value={hobby}>
                                    <Checkbox
                                        checked={selectedHobbies.includes(
                                            hobby
                                        )}
                                    />
                                    <ListItemText primary={hobby} />
                                </MenuItem>
                            ))}
                        </Select>
                    </InputDiv>
                )}
                {renderButton()}
                <pre>{JSON.stringify(watch(), null, 2)}</pre>
            </Form>
        </Container>
    );
};

export default SignUpPage;
