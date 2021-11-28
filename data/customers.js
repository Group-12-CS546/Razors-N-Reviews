const mongoCollections = require('../config/mongoCollections');
var mongo = require('mongodb');
const customers = mongoCollections.customers;
ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcryptjs');
const saltRounds = 16;


module.exports = {

    async checkDuplicate(un) {

      const userCollection = await customers();
  
      const user1 = await userCollection.find({}).toArray();
      for(let i=0;i<user1.length;i++){
        let str=user1[i].username.toString();

        if(user1[i].username==un){
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

    async getAllCustomers(){
      const customers_data = await customers();
      const list_all_customers = await customers_data.find({}).toArray();
     return  JSON.parse(JSON.stringify(list_all_customers));

    },

    /*
        ************* Get customers by ID**********************
    */ 


  async getCustomerById(id) {
    if (!id) throw 'No id entered';
    if(typeof id === 'string' && id.length==0){
      throw 'Invalid id';
    }

    const ObjectId = require('mongodb').ObjectId;
    if(!ObjectId.isValid(id)){
      throw 'Not a valid ObjectId';
    }
    

    const customerCollection = await customers();
    const customer = await customerCollection.findOne({_id: ObjectId(id)});
    if (customer === null) throw 'restaurant does not exist';
    customer._id=customer._id.toString();
    return customer;
  },

   

    
   
  
   
    async createUser(firstname,lastname,email,username,password,profilePicture,state,city,age) {

        

        /*
        ************* Firstname validation **********************
        */   
        
        
        /*
        ************* Firstname is lowercase  and more than 2 characters**********************
        */ 
       
        firstname = firstname.toLowerCase();
        
        
       
        /*
        ************* For empty string **********************
        */ 
        
        if (!firstname ) throw 'Firstname not provided';

        /*
        ************* For firstname  not of  string type **********************
        */ 

        if(typeof firstname !="string"  ){
           
            throw 'Firstname not of type string'
          }
          
        
        /*
        ************* Lastname validation **********************
        */   
        
        
        /*             
        
        ************* Lastname is lowercase  and more than 2 characters**********************
        */ 
       
        lastname = lastname.toLowerCase();
                
        /*
        ************* For empty string **********************
        */ 
        
        if (!lastname ) throw 'Lastname not provided';

        /*
        ************* For firstname  not of  string type **********************
        */ 

        if(typeof lastname !="string"  ){
           
            throw 'Lastname not of type string'
          }
          
        

        /*
        ************* Username validation **********************
        */

        username = username.toLowerCase();
        if(username.length<3){
            throw 'Username should contain more than two characters '
        }

        /*
        ************* Username Alphanumeric check **********************
        */

        for(let i=0;i<username.length;i++) {
            if(username.charCodeAt(i)>=48 && username.charCodeAt(i)<=57 || username.charCodeAt(i)>=65 && username.charCodeAt(i)<=90 || username.charCodeAt(i)>=97 && username.charCodeAt(i)<=122) {        
                      
            }
            else{
                throw 'User name contains non alphanumeric characters'
            }
        }
        
        /*
        ************* Username empty  **********************
        */
        
        if (!username ) throw 'User name not provided';
         
        /*
        ************* Username validation ends**********************
        */

       
        
        /*
        ************* Password validation **********************
        */

        if (!password) throw 'Password not provided';

        if(typeof username !="string" || typeof password !="string" ){
           
          throw 'Parameter not of type string'
        }
    
    
        if(username.trim().length==0){
          
          throw 'Username cannot be empty spaces'
        }
        if(password.trim().length==0 ){
          
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
          username : username,
          password : password,
          firstname:firstname,
          lastname:lastname,
          email:email,
          profilePicture: profilePicture,
          city: city,
          state: state,
          age: age,
          reviewId: [],
          covidReviewIds:[],
          commentIds: []
         
        };


      let temp= await this.checkDuplicate(username) 
      if(!temp){
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
        if(username.length<4){
            throw 'Username should contain more than three characters '
        }

        if(password.length<6){
            throw 'Password should contain more than five characters '
        }

        for(let i=0;i<username.length;i++) {
            if(username.charCodeAt(i)>=48 && username.charCodeAt(i)<=57 || username.charCodeAt(i)>=65 && username.charCodeAt(i)<=90 || username.charCodeAt(i)>=97 && username.charCodeAt(i)<=122) {        
                      
            }
            else{
                throw 'User name contains non alphanumeric characters'
            }
        }
        

        
        if (!username ) throw 'User name not provided';

        if ( !password) throw 'Password not provided';

        if(typeof username !="string" || typeof password !="string" ){
           
          throw 'Parameter not of type string'
        }
    
    
        if(username.trim().length==0){
          
          throw 'Username cannot be empty spaces'
        }
        if(password.trim().length==0 ){
          
            throw 'Password cannot be empty spaces'
          }

          const userCollection = await customers();
  
      const user1 = await userCollection.find({}).toArray();
      
       flag=0;
      for(let i=0;i<user1.length;i++){
        
        let str=user1[i].username.toString();
        if(str==username ){
            if (bcrypt.compareSync(password,user1[i].password)){
                flag=1;
                console.log("Credentials match")
                return {authenticated: true};
            }
			
        }
        
     }
     if(flag==0){
         throw "Either the username or password is invalid"
     }
        
      },


     
};
