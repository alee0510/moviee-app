import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, FormControl, InputLabel, Input, InputAdornment, IconButton, Button } from '@material-ui/core'

import AccountCircle from '@material-ui/icons/AccountCircle'
import LockIcon from '@material-ui/icons/Lock'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import EmailIcon from '@material-ui/icons/Email'

import '../style/register.css'

// API
import Axios from 'axios'
import API_URL from '../supports'

// redux
import { Redirect, Link } from 'react-router-dom'

const InputStyle = withStyles({
    underline: {
        color: 'white',
        borderBottom: 'white',
        width : '25vw',
            '&:after': {
                borderBottom: `2px solid white`,			
            },				
            '&:focused::after': {
                borderBottom: `2px solid white`,
            },		
            '&:before': {
                borderBottom: `1px solid white`,			
            },
            '&:hover:not($disabled):not($focused):not($error):before': {
                borderBottom: '2px solid rgb(255, 255, 255) !important',
            },
            '&$disabled:before': {
                borderBottom: `1px dotted white`,
            }
    },
    disabled: {},
    focused : {},
    error : {}
})(Input)

// pass protect confirmation
function Char (props) {
    if (props.show) {
        return <div style = {{color : 'green', fontSize : '10pt'}} id ='reg-alert'> * Password length must be 8 or more Characters </div>
    } else {
        return <div style = {{color : '#bb002f', fontSize : '10pt'}} id ='reg-alert'> * Password length must be 8 or more Characters </div>
    }
}

function Spec (props) {
    if (props.show) {
        return <div style = {{color : 'green', fontSize : '10pt'}} id ='reg-alert'> * Password must include special characters </div>
    } else {
        return <div style = {{color : '#bb002f', fontSize : '10pt'}} id ='reg-alert'> * Password must include special characters </div>
    }
}

function Num (props) {
    if (props.show) {
        return <div style = {{color : 'green', fontSize : '10pt'}}> * Password must include number </div>
    } else {
        return <div style = {{color : '#bb002f', fontSize : '10pt'}}> * Password must include number </div>
    }
}

class Register extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            vis : false,
            char : false,
            spec : false,
            num : false,
            show : false,
            regis : false
        }
    }

    regisUser = () => {
        let { char, spec, num } = this.state
        let username = this.text.value
        let email = this.email.value
        let pass = this.pass.value
        let confirmPass = this.confirmPass.value
        console.info('username : ', username, ' email : ', email, ' pass : ', pass, ' confirm pass : ', confirmPass)
        if ( pass !== confirmPass ) {
            alert ('Invalid password')
        } else {
            Axios.get(API_URL + 'user', {
                params : {username} // check if username is already exist
            })
            .then ((res) => {
                if (res.data.length !== 0) {
                    alert ('username has been taken')
                } else {
                    if ( char && num && spec) {
                        Axios.post(API_URL + 'user', {
                            username : username, 
                            pass : pass,
                            email : email,
                            role : 'user',
                            avatar : ''
                        })
                        .then ((res) => {
                            this.setState({regis : true}) // update regis status to true
                            console.table(res.data)
                        })
                        .catch ( (err) => console.log(err))
                        // clear input value
                        this.username.value = ''
                        this.email.value = ''
                        this.pass.value = ''
                        this.confirmPass.value = ''
                    } else {
                        alert ('please fill the password requirments')
                    }
                }
            })
            .catch ( (err) => console.log(err))
        }
    }

    handleClickShowPassword = () => {
        this.setState({vis : !this.state.vis}, () => {
            console.info('show value : ', this.state.vis)
        })
    }

    handleChange = (event) => {
        let pass = event.target.value
        let num = /[0-9]/
        let spec = /[!@#$%^&*;]/
        this.setState ( {
            num : num.test(pass),
            spec : spec.test(pass),
            char : pass.length > 7,
        })
    }

    showReg = () => {
        this.setState ( {show : true} )
    }

    render () {
        if (this.state.regis) {
            return <Redirect to = '/login'></Redirect>
        }
        let { char, spec, num, show, vis } = this.state
        return (
            <div id = 'reg'>
                <h1>Register</h1>
                <div id = 'inputGrid'>
                    <Grid container spacing={2} alignItems="flex-end" id = 'grid'>
                            <Grid item>
                                <AccountCircle/>
                            </Grid>
                            <Grid item>
                                <FormControl style = {{padding : '5px 0px 5px 0px'}} >
                                    <InputLabel htmlFor="adornment-amount" style = {{color : 'white'}}>Username</InputLabel>
                                    <InputStyle
                                        id="adornment-amount"
                                        type = 'text'
                                        inputRef = {text => this.text = text}
                                    />
                                </FormControl>  
                            </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="flex-end" id = 'grid'>
                            <Grid item>
                                <EmailIcon/>
                            </Grid>
                            <Grid item>
                                <FormControl style ={{padding : '5px 0px 5px 0px'}} >
                                    <InputLabel htmlFor="adornment-amount" style = {{color : 'white'}}>Email</InputLabel>
                                    <InputStyle
                                        id="adornment-amount"
                                        type = 'text'
                                        inputRef = {email => this.email = email}
                                    />
                                </FormControl>  
                            </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="flex-end" id = 'grid'>
                            <Grid item>
                                <LockIcon/>
                            </Grid>
                            <Grid item>
                                <FormControl style ={{padding : '5px 0px 5px 0px'}} >
                                    <InputLabel htmlFor="adornment-amount" style = {{color : 'white'}}>Password</InputLabel>
                                    <InputStyle
                                        id="adornment-amount"
                                        type = {vis ? 'text' : 'password'}
                                        onChange = {this.handleChange} 
                                        onFocus = {this.showReg}
                                        inputRef = {pass => this.pass = pass}
                                        endAdornment={
                                            <InputAdornment position="end" >
                                                <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                >
                                                {vis ? <Visibility style = {{color : 'white'}}/> : <VisibilityOff style = {{color : 'white'}}/>}
                                                </IconButton>
                                        </InputAdornment>
                                        }
                                    />
                                </FormControl>  
                            </Grid>
                    </Grid>
                    <Grid container spacing={2} alignItems="flex-end" id = 'grid'>
                            <Grid item>
                                <LockIcon/>
                            </Grid>
                            <Grid item>
                                <FormControl style ={{padding : '5px 0px 5px 0px'}} >
                                    <InputLabel htmlFor="adornment-amount" style = {{color : 'white'}}>Confirm Password</InputLabel>
                                    <InputStyle
                                        id="adornment-amount"
                                        type = {vis ? 'text' : 'password'}
                                        inputRef = {confirmPass => this.confirmPass = confirmPass}
                                        endAdornment={
                                            <InputAdornment position="end" >
                                                <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                >
                                                {vis ? <Visibility style = {{color : 'white'}}/> : <VisibilityOff style = {{color : 'white'}}/>}
                                                </IconButton>
                                        </InputAdornment>
                                        }
                                    />
                                </FormControl>  
                            </Grid>
                    </Grid>
                </div>
                {
                    show ? 
                    <div>
                        <Char show = {char}></Char>
                        <Spec show = {spec}></Spec>
                        <Num show = {num}></Num>
                    </div>
                    : null
                }
                <div class = 'btn-reg'>
                    <Link to = '/'>
                        <Button id = 'btn-cancel' >Cancel</Button>
                    </Link>
                    <Button variant = 'contained' id = 'btn-register' onClick = {this.regisUser}>Register</Button>
                </div>
            </div>
        )
    }
}


export default Register