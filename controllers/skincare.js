// Import Dependencies
const express = require('express')
const Skincare = require('../models/skincare')

// Create router
const router = express.Router()

// // Router Middleware
// // Authorization middleware
// // If you have some resources that should be accessible to everyone regardless of loggedIn status, this middleware can be moved, commented out, or deleted. 
// router.use((req, res, next) => {
// 	// checking the loggedIn boolean of our session
// 	if (req.session.loggedIn) {
// 		// if they're logged in, go to the next thing(thats the controller)
// 		next()
// 	} else {
// 		// if they're not logged in, send them to the login page
// 		res.redirect('/auth/login')
// 	}
// })

// Routes

// index ALL
router.get('/', (req, res) => {
	Skincare.find({})
		.then(skincares => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			
			res.render('skincares/index', { skincares, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the quiz
router.get('/quiz', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('skincares/quiz', { username, loggedIn })
})

// new route -> GET route that renders our page with the quiz results
router.get('/quiz/results', async (req, res) => {
	const { username, userId, loggedIn } = req.session
	const day = (req.query.nightOrDay == "true");
	const night = !day;

	const products = await Skincare.find({
		day: day, 
		night: night,
		sensitiveSkin: (req.query.sensitiveSkin == "true"),
		skinConcern: req.query.skinConcern
	})

	res.render('skincares/results', { username, loggedIn, products })
})

// index that shows only the user's skincare
router.get('/skincares/results', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Skincare.find({ owner: userId })
		.then(skincares => {
			res.render('skincares/index', { skincares, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('skincares/new', { username, loggedIn })
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	req.body.ready = req.body.ready === 'on' ? true : false

	req.body.owner = req.session.userId
	Skincare.create(req.body)
		.then(skincare => {
			console.log('this was returned from create', skincare)
			res.redirect('/skincares')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const skincareId = req.params.id
	Skincare.findById(skincareId)
		.then(skincare => {
			res.render('skincares/edit', { skincare })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// update route
router.put('/:id', (req, res) => {
	const skincareId = req.params.id
	req.body.ready = req.body.ready === 'on' ? true : false

	Skincare.findByIdAndUpdate(SkincareId, req.body, { new: true })
		.then(skincare => {
			res.redirect(`/skincares/${skincare.id}`)
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// show route
router.get('/:id', (req, res) => {
	const skincareId = req.params.id
	Skincare.findById(skincareId)
		.then(skincare => {
            const {username, loggedIn, userId} = req.session
			res.render('skincares/show', { skincare, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
	const skincareId = req.params.id
	Skincare.findByIdAndRemove(skincareId)
		.then(skincare => {
			res.redirect('/skincares')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router
