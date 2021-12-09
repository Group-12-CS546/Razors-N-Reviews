const mongoCollections = require('../config/mongoCollections');
var mongo = require('mongodb');
const customers = mongoCollections.customers;
ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const saltRounds = 16;


module.exports = {

    async checkDuplicate(un) {

        const userCollection = await customers();

        const user1 = await userCollection.find({}).toArray();
        for (let i = 0; i < user1.length; i++) {
            let str = user1[i].username.toString();

            if (user1[i].username == un) {
                // console.log(user1[i].username,un)
                console.log('************* Check duplicate username**********************');
                return 0
            }
        }
        return 1;
    },

    /*
     ************* All Get functions **********************
     */


    /*
     ************* Grt All customers**********************
     */

    async getAllCustomers() {
        const customers_data = await customers();
        const list_all_customers = await customers_data.find({}).toArray();
        return JSON.parse(JSON.stringify(list_all_customers));

    },


    async getCustomerIdbyusername(username) {
        let userData = {};
        const customerCollection = await customers();
        const customer_details = await customerCollection.findOne({ username: "username" });
        return customer_details
    },


    /*
     ************* Get customers by ID**********************
     */


    async getCustomerById(id) {
        if (!id) throw 'No id entered';
        if (typeof id === 'string' && id.length == 0) {
            throw 'Invalid id';
        }

        const ObjectId = require('mongodb').ObjectId;
        if (!ObjectId.isValid(id)) {
            throw 'Not a valid ObjectId';
        }


        const customerCollection = await customers();
        const customer = await customerCollection.findOne({ _id: ObjectId(id) });
        if (customer === null) throw 'Customer does not exist';
        customer._id = customer._id.toString();
        return customer;
    },


    async deleteCustomerbyId(id) {



    },

    async deleteCustomerbyId(id) {

        if (!id) throw 'No id entered';
        if (typeof id === 'string' && id.length == 0) {
            throw 'Invalid id';
        }

        const ObjectId = require('mongodb').ObjectId;
        if (!ObjectId.isValid(id)) {
            throw 'Not a valid ObjectId';
        }
        /* delete review from DB */
        const reviewCollection = await customers();
        const customerCollection = await customers();
        const customerinfo = await customerCollection.deleteOne({ _id: ObjectId(id) });
        // const deletionInfo = await reviewCollection.deleteOne({ _id: ObjectId(reviewId) });
        if (customerinfo.deletedCount === 0) throw `Could not delete user of ${id}.`;

        return { userdeleted: true };
    },




    async createUser(firstname, lastname, email, username, password, profilePicture, state, city, age) {



        /*
          TODO
          : How to check if no parameter provided??
         */



        if (firstname == undefined) {
            throw 'Parameter not provided'
        }

        /*
         ************* For firstname  not of  string type **********************
         */

        if (typeof firstname != "string") {

            throw 'Firstname not of type string'
        }

        /*
         ************* Firstname is Uppercased and trimmed**********************
         */
        firstname = firstname.toUpperCase();
        firstname = firstname.trim()


        // console.log(firstname)




        /*
         ************* For empty string **********************
         */

        if (!firstname) throw 'Firstname not provided or only empty spaces provided';



        /*
         ************* For validating input as character only **********************
         */



        function isCharacterALetter(char) {
            char = firstname
            value = /^[a-zA-Z]+$/.test(char);
            // console.log(value);  
            return value
        }

        let test = isCharacterALetter(firstname)
        if (test) {

        } else {
            throw 'Firstname should only be characters'
        }






        /*
         ************* Firstname validation ends**********************
         */




        /*
         ************* Lastname validation  starts**********************
         */

        /*
         ************* For firstname  not of  string type **********************
         */

        if (typeof lastname != "string") {

            throw 'Lastname not of type string'
        }

        /*             
        
        ************* Lastname is lowercase  and trimmed**********************
        */

        lastname = lastname.toUpperCase();
        lastname = lastname.trim()

        /*
         ************* For empty string **********************
         */

        if (!lastname) throw 'Lastname not provided or only empty spaces provided';


        /*
         ************* For validating input as character only **********************
         */

        function isCharacterALetter(char) {
            char = lastname
            value = /^[a-zA-Z]+$/.test(char);
            // console.log(value);  
            return value
        }

        let test2 = isCharacterALetter(lastname)
        if (test2) {

        } else {
            throw 'Lastname should only be characters'
        }



        /*
         ************* Username validation **********************
         */

        username = username.toLowerCase();
        if (username.length < 3) {
            throw 'Username should contain more than two characters '
        }


        /*
         ************* For validating input as character only **********************
         */



        /*
         ************* Username Alphanumeric check **********************
         */

        for (let i = 0; i < username.length; i++) {
            if (username.charCodeAt(i) >= 48 && username.charCodeAt(i) <= 57 || username.charCodeAt(i) >= 65 && username.charCodeAt(i) <= 90 || username.charCodeAt(i) >= 97 && username.charCodeAt(i) <= 122) {

            } else {
                throw 'User name contains non alphanumeric characters'
            }
        }

        /*
         ************* Username empty  **********************
         */

        if (!username) throw 'User name not provided';

        if (username.trim().length == 0) {

            throw 'Username cannot be empty spaces'
        }


        /*
         ************* For validating input as character only **********************
         */



        /*
         ************* Username validation ends**********************
         */
        email = email.toLowerCase()

        if (!email) {
            throw 'Email not provided'
        }
        if (email.trim().length == 0) {

            throw 'Email cannot be empty spaces'
        }

        function validateEmail(email) {

            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }
        console.log(validateEmail(email));
        let email_result = validateEmail(email)

        if (email_result) {

        } else {
            throw 'Email is not valid'
        }








        /*
         ************* Password validation **********************
         */

        if (!password) throw 'Password not provided';

        if (typeof username != "string" || typeof password != "string") {

            throw 'Password/Username not of type string'
        }



        if (password.trim().length == 0) {

            throw 'Password cannot be empty spaces'
        }



        /*
         ************* Password validation Ends **********************
         */

        /*
         ************* Using Bcrypt **********************
         */
        const plainTextPassword = password;
        const hash = await bcrypt.hash(plainTextPassword, saltRounds);
        password = hash;

        const userCollection = await customers();

        let newUser = {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            email: email,
            profilePicture: profilePicture,
            city: city,
            state: state,
            age: age,
            reviewId: [],
            covidReviewId: [],
            commentIds: []

        };


        let temp = await this.checkDuplicate(username)
        if (!temp) {
            console.log('Check duplicate function ends')
            throw 'User name already exists'
            console.log("-----------------------------")
        }

        const insertInfo = await userCollection.insertOne(newUser);
        if (insertInfo.insertedCount === 0) throw 'Could not add new User';
        const newId = insertInfo.insertedId;
        const customer = await this.getCustomerById(newId.toString());
        return JSON.parse(JSON.stringify(customer));

        // return {userInserted: true};


    },

    async checkUser(username, password) {

        username = username.toLowerCase();
        if (username.length < 4) {
            throw 'Username should contain more than three characters '
        }

        if (password.length < 6) {
            throw 'Password should contain more than five characters '
        }

        for (let i = 0; i < username.length; i++) {
            if (username.charCodeAt(i) >= 48 && username.charCodeAt(i) <= 57 || username.charCodeAt(i) >= 65 && username.charCodeAt(i) <= 90 || username.charCodeAt(i) >= 97 && username.charCodeAt(i) <= 122) {

            } else {
                throw 'User name contains non alphanumeric characters'
            }
        }



        if (!username) throw 'User name not provided';

        if (!password) throw 'Password not provided';

        if (typeof username != "string" || typeof password != "string") {

            throw 'Parameter not of type string'
        }


        if (username.trim().length == 0) {

            throw 'Username cannot be empty spaces'
        }
        if (password.trim().length == 0) {

            throw 'Password cannot be empty spaces'
        }

        const userCollection = await customers();

        const user1 = await userCollection.find({}).toArray();

        flag = 0;
        for (let i = 0; i < user1.length; i++) {

            let str = user1[i].username.toString();
            if (str == username) {
                if (bcrypt.compareSync(password, user1[i].password)) {
                    flag = 1;
                    console.log("Credentials match")
                    return { authenticated: true };
                }

            }

        }
        if (flag == 0) {
            throw "Either the username or password is invalid"
        }

    },



};