const app = require('./app');
const passport = require('passport'); // user auth
const {findById, findOne, createUser,findAllUsers,updateUser,deleteUser} = require('./databaseOps/userOperations');
const {findPropById, createProperty,findAllProperties,updateProperty,deleteProperty} = require('./databaseOps/propertyOperations');
const {createReservation,findReservationsByUser} = require('./databaseOps/reservationOperations');
const {User} = require('./models/userModel')
const {createOwner, findAllOwners, findOwnerById, deleteOwner, updateOwner} = require('./databaseOps/ownerOperations')
const mongoose = require('mongoose')
// Register route

app.get("/", (req, res)=>{
  res.render("home")
})

app.get("/register", (req, res) => {
  res.render("register")
})

app.post('/register', async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  // Perform input validation 
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  console.log("Nice");
  // Check if the user already exists
  const [user] = await findOne(username);
  if (user){
    console.log(user);
    res.send("Username already exists")
  }
  else{
    console.log(username + " " + email + " " + password);
    createUser({username: username, email: email, password: password})
    res.redirect("/login")
  }
    
});



app.get('/login', (req, res) => {
  res.render("login")
})

// Login route
app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/dashboard',
  }),
  (req, res) => {
    console.log(req.user);
  }
);


// Logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log(req.isAuthenticated());
    return next();
  }
  else{
    console.log(req.isAuthenticated());
    res.redirect('/login');
  }
  
}

// Protected route
app.get('/dashboard', isAuthenticated, async (req, res) => {
  // Render the dashboard for authenticated users
  const [user] = await findById(req.session.passport.user)
  const nests = await findAllProperties()
  res.render("dashboard", {user: user, nests: nests})
});



app.get('/nests/:id', async (req, res) => {
  const nest_id = req.params.id;
  console.log(nest_id);
  if (!mongoose.Types.ObjectId.isValid(nest_id)) {
    // Handle invalid ObjectId
    return res.status(400).send('Invalid nest ID');
  }
  
  const nest = await findPropById(nest_id);
  if (!nest) {
    // Handle nest not found
    return res.status(404).send('Nest not found');
  }
  console.log(nest);
  console.log("madda");
  res.render('nestpage', { nest: nest });
});

app.post('/checkout', (req, res) => {
  const rate = parseFloat(req.body.propertyRate);
  const from = new Date(req.body.from).getTime();
  const to = new Date(req.body.to).getTime();
  const propertyName = req.body.propertyName;
  const propertyPlace = req.body.propertyPlace;
  const propertyRate = req.body.propertyRate;
  const propertyOwner = req.body.propertyOwner;
  const days = (to - from) / (1000 * 3600 * 24);
  const cost = rate * days;

  const fromDate = new Date(from).toLocaleDateString();
  const toDate = new Date(to).toLocaleDateString();
  res.render("checkout", {
    propertyName: propertyName,
    propertyPlace: propertyPlace,
    propertyRate: propertyRate,
    propertyOwner: propertyOwner,
    cost: cost,
    from: fromDate,
    to: toDate
  });
});








app.post('/thanku', (req, res) => {
  res.render("thanku", {propertyName: req.body.propertyName, propertyPlace: req.body.propertyPlace, from: req.body.from, to: req.body.to})
})
// const ownerprop = async () => {
//   try {
//     const owner = await createOwner({
//       ownerName: 'Pavan',
//       email: 'pa@1234.com',
//       phoneNumber: '999673398',
//     });

//     console.log(owner);

//     const property = await createProperty({
//       propertyName: 'Sweet Homes',
//       propertyPlace: 'Langer Houz',
//       propertyOwner: owner._id,
//       propertyRate: 3000,
//     });

//     console.log(property);
//   } catch (error) {
//     console.log(error);
//   }
// };

// ownerprop();


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
