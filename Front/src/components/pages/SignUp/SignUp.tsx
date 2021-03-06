import React, { CSSProperties, FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Checkbox,
    InputAdornment,
    InputLabel,
    ListItemText,
    Step,
    StepLabel,
    Input,
    MenuItem,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { gql, useMutation } from '@apollo/client';
import {
    Title,
    Container,
    Form,
    TextInput,
    InputDiv,
    Stepper,
    Select,
    BirthdateContainer,
    BirthdateLabel,
    CustomDatePicker,
    Chip,
} from './style';
import Button from '../../Button/Button';
import useLogin from '../../../hooks/useLogin';
import { allHobbies } from '../../../type';

const CREATE_USER = gql`
    mutation createUser($newUser: UserCreationInput!) {
        createUser(newUser: $newUser) {
            email
        }
    }
`;

export interface EyeIconProps {
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

const steps = ['Account informations', 'Personal informations', 'Your hobbies'];

const SignUpPage: FC = () => {
    const { login } = useLogin();
    const [showPassword, setShowPassword] = useState(false);
    const [formStep, setFormStep] = useState(0);
    const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ mode: 'all' });
    const [createUser] = useMutation(CREATE_USER);
    const getAllFirstLettersUpperCase = (str: string): string => {
        const words = str.split(' ');
        words.forEach((word: string, i: number) => {
            words[i] = word[0].toUpperCase() + word.slice(1);
        });
        return words.join(' ');
    };
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
        await createUser({
            variables: {
                newUser: {
                    ...data,
                },
            },
        });
        login({ email: data.email, password: data.password });
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
                    style={{ maxWidth: '49%' }}
                >
                    Validate
                </Button>
            );
        return (
            <Button
                disabled={Object.values(errors).length > 0}
                type="button"
                onClick={(e: any) => handleClick(e)}
                style={{ maxWidth: '49%' }}
            >
                Next step
            </Button>
        );
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmitForm)}>
                <Title>Create you account ! </Title>
                <Stepper activeStep={formStep} alternativeLabel>
                    {steps.map((label, index) => (
                        <Step onClick={() => setFormStep(index)} key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {formStep === 0 && (
                    <InputDiv>
                        <TextInput
                            autoComplete="off"
                            label="Username"
                            variant="outlined"
                            error={errors.username}
                            helperText={
                                errors.username && errors.username.message
                            }
                            {...register('username', {
                                required: {
                                    value: true,
                                    message: 'Please fill in your username',
                                },
                            })}
                        />
                        <TextInput
                            autoComplete="off"
                            label="Email"
                            variant="outlined"
                            error={errors.email}
                            helperText={errors.email && errors.email.message}
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: 'Please fill in your email',
                                },
                            })}
                        />
                        <TextInput
                            autoComplete="off"
                            label="Password"
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
                                        'Please enter a valid password. The password must contain at least 8 characters with at least one number, one upper case letter, one lower case letter and one non-alpha numeric character.',
                                },
                                required: {
                                    value: true,
                                    message: 'Please fill in your password',
                                },
                            })}
                        />
                    </InputDiv>
                )}
                {formStep === 1 && (
                    <InputDiv>
                        <TextInput
                            autoComplete="off"
                            label="Firstname"
                            variant="outlined"
                            error={errors.firstname}
                            helperText={
                                errors.firstname && errors.firstname.message
                            }
                            {...register('firstname', {
                                required: {
                                    value: true,
                                    message: 'Please fill in your firstname',
                                },
                            })}
                        />
                        <TextInput
                            autoComplete="off"
                            label="Lastname"
                            variant="outlined"
                            error={errors.lastname}
                            helperText={
                                errors.lastname && errors.lastname.message
                            }
                            {...register('lastname', {
                                required: {
                                    value: true,
                                    message: 'Please fill in your lastname',
                                },
                            })}
                        />
                        <TextInput
                            autoComplete="off"
                            label="City"
                            variant="outlined"
                            error={errors.city}
                            helperText={errors.city && errors.city.message}
                            {...register('city', {
                                required: {
                                    value: true,
                                    message: 'Please fill in your city',
                                },
                            })}
                        />
                        <BirthdateContainer>
                            <BirthdateLabel>Birthdate</BirthdateLabel>
                            <Controller
                                control={control}
                                name="birthDate"
                                render={({ field }) => (
                                    <CustomDatePicker
                                        onChange={(date: Date) =>
                                            field.onChange(date)
                                        }
                                        value={field.value}
                                        minDate={new Date('01/01/1920')}
                                        maxDate={new Date()}
                                        showLeadingZeros
                                        format="dd / MM / yyyy"
                                        dayPlaceholder=" "
                                        monthPlaceholder=" "
                                        yearPlaceholder=" "
                                    />
                                )}
                            />
                        </BirthdateContainer>
                    </InputDiv>
                )}
                {formStep === 2 && (
                    <InputDiv>
                        <InputLabel id="hobbies-mutiple-checkbox-label">
                            What are your hobbies ?
                        </InputLabel>
                        <Select
                            MenuProps={{
                                style: { maxHeight: '30rem' },
                                getContentAnchorEl: null,
                            }}
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
                                        (hobby: string) => {
                                            return (
                                                <Chip
                                                    key={hobby}
                                                    label={getAllFirstLettersUpperCase(
                                                        hobby
                                                    )}
                                                />
                                            );
                                        }
                                    )}
                                </div>
                            )}
                        >
                            {allHobbies.map((hobby) => {
                                return (
                                    <MenuItem key={hobby} value={hobby}>
                                        <Checkbox
                                            checked={selectedHobbies.includes(
                                                hobby
                                            )}
                                        />
                                        <ListItemText
                                            primary={getAllFirstLettersUpperCase(
                                                hobby
                                            )}
                                        />
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </InputDiv>
                )}

                {renderButton()}
            </Form>
        </Container>
    );
};

export default SignUpPage;
