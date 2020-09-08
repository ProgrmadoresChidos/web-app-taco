import React from 'react';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCopyright } from '@fortawesome/free-solid-svg-icons';

import { selectSignupFetching, selectSignupUser, selectSignupError, signup } from '../../redux/signup/reduxSignup';
import style from './signup.module.css';

const Signup = () => {

    const signupFetching = useSelector(selectSignupFetching);
    const signupUser = useSelector(selectSignupUser);
    const signupError = useSelector(selectSignupError);
    const dispatch = useDispatch();

    const icon = <FontAwesomeIcon
        icon={faUserCircle}
        size="3x"
        className={style.Form__icon}
    />;
    const icon_copyRights = <FontAwesomeIcon icon={faCopyright} />;

    const formSchema = Yup.object().shape({
        firstName: Yup.string()
            .required("Campo requerido")
            // .matches("/^[a-zA-Z][a-zA-Z\s]*$/", 'Caracteres no validos')
        ,
        confirm_password: Yup.string()
            .required("Campo requerido")
            .oneOf(
                [Yup.ref('password'), null],
                "Las contraseñas no son iguales"
            )
    });

    return (
        <div className={`${style.container} ${style.container_position}`}>
            <div className={`${style.container__FormContainer} ${style.container__FormContainer_position}`}>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirm_password: '',
                        save: false
                    }}
                    validationSchema={formSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            dispatch(signup(values))
                            console.info('segundo')
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    <Form className={`${style.Form} ${style.Form__position}`}>
                        <div className={`${style.Form__container} ${style.Form__position_center}`}>
                            {icon}
                        </div>
                        <div className={`${style.Form__container} ${style.Form__position_center}`}>
                            <h2 className={`${style.Form__tittle}`}>Registro</h2>
                        </div>
                        <div className={`${style.Form__container}`}>
                            <div className={`${style.Form__container_short}`}>
                                <Field
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    required
                                    className={` ${style.Form__input} ${style.Form__input_event} `}
                                />
                                <label htmlFor="firstName" className={`${style.Form_label}`}>Nombre</label>
                            </div>

                            <div className={`${style.Form__container_short}`}>
                                <Field
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    required
                                    className={` ${style.Form__input} ${style.Form__input_event} `}
                                />
                                <label htmlFor="lastName" className={`${style.Form_label}`}>Apellidos</label>
                            </div>
                        </div>
                        <div className={`${style.Form__container}`}>
                            <div className={`${style.Form__container_large}`}>
                                <Field
                                    id="email"
                                    name="email"
                                    type="text"
                                    required
                                    className={` ${style.Form__input} ${style.Form__input_event} `}
                                />
                                <label htmlFor="email" className={`${style.Form_label}`}>Correo</label>
                            </div>
                            <div className={`${style.Form__container_large}`}>
                                <Field
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className={` ${style.Form__input} ${style.Form__input_event} `}
                                />
                                <label htmlFor="password" className={`${style.Form_label}`}>Contraseña</label>
                            </div>
                            <div className={`${style.Form__container_large}`}>
                                <Field
                                    id="confirm_password"
                                    name="confirm_password"
                                    type="password"
                                    required
                                    className={` ${style.Form__input} ${style.Form__input_event} `}
                                />
                                <label htmlFor="confirm_password" className={`${style.Form_label}`}>Repetir contraseña</label>
                            </div>
                            {/* <ErrorMessage name="confirm_password" render={(msg) => <div>{msg}</div>} /> */}
                        </div>
                        <div className={`${style.Form__container} ${style.Form__checkbox_position}`}>
                            <label htmlFor="save" className={`${style.Form__checkbox_text}`}>
                                <Field type="checkbox" id="save" name="save" className={`${style.Form__checkbox}`} />
                                <span className={`${style.Form__checkmark}`}></span>
                                Recordar credenciales?
                            </label>
                        </div>
                        <div className={style.Form__container}>
                            <button type='submit' className={style.Form__button}>Registrar</button>
                        </div>
                        <div className={`${style.Form__container} ${style.Form__nav_position} `}>
                            <NavLink className={`${style.Form__nav}`} to="/login">Tienes una cuenta? Inicia Sesión</NavLink>
                        </div>
                        <div className={`${style.Form__container} ${style.Form__position_center}`}>
                            <p className={`${style.Form_copyrights}`}>
                                {icon_copyRights} 2023 La App del taco.
                            </p>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div >
    )
}

export default Signup