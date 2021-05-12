import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@pieshop.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Prayas Banerjee',
        email: 'prayas@email.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Rupan Banerjee',
        email: 'rupan@email.com',
        password: bcrypt.hashSync('123456', 10)
    }
]


export default users;