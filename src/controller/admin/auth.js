const User = require('../../models/auth')
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) {
                return res.status(400).json({
                    message: 'Admin Already Registred'
                })
            }
            const { firstName, lastName, email, password } = req.body;
            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                fullName: `${firstName} ${lastName}`,
                userName: `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.random().toString().substr(2, 9)}`
            })

            _user.save((error, userData) => {
                if (error) {
                    return res.status(400).json({
                        message: 'Something went wrong'
                    })
                }
                else {
                    return res.status(201).json({
                        message: 'Admin Create Successfully'
                    })
                }
            })
        })
}
exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error })
            if (user) {
                user.authenticate(req.body.password)
                .then(result => {
                    if(result && user.role === 'admin'){
                        const {_id, firstName, lastName, userName, fullName, role, email} = user;
                        const token = jwt.sign({ _id}, process.env.JWT_TOKEN, { expiresIn: '1d' });
                        return res.status(200).json({
                            token,
                            user:{
                                firstName, lastName, userName, fullName, role, email
                            }
                        })
                    }
                    else if(result && user.role === 'user'){
                        return res.status(400).json({message: 'Admin not found'})
                    }
                    else{
                        return res.status(400).json({message: 'Invalid Password'})
                    }
                })
                .catch(err => {
                    if(err){
                        return res.status(400).json({message: 'Invalid Password'})
                    }
                })
            }
            else{
                return res.status(400).json({
                    message: 'Something went wrong'
                })
            }
        })
}

exports.signout = (req, res)=>{
    res.status(200).json({message: 'Oke'})
}