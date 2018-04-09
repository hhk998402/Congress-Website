var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/itc/brochure',(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var success = (email != '' || email !=undefined || email != null)? ((name != '' || name !=undefined || name != null )?true : false) : false;
    if(success){
        var transporter = nodemailer.createTransport({
            host: "smtpout.asia.secureserver.net",
            secure : true,
            port: 465,
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        var mailOptions = {
            from: process.env.EMAIL_ID,
            to: email,
            subject: 'CodePark - Email Authentication',
            text : "Please click the link to download the brochure.\n http://localhost:3000/assets/itc_brochure.pdf"
        };
        transporter.sendMail(mailOptions, function(err, info){
            if(err){
                console.log(err);
                res.json({code: 1, message: "Failed !\n Something went wrong!\n Please try again."});
            }
            else{
                res.json({code: 0, message: "An Email has been sent with the brochure."});
            }
        });
    }
})
module.exports = router;
