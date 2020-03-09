const passport = require('passport');
const KakaoStrategy = require("passport-kakao").Strategy;
const dotenv = require('dotenv');
const User = require('../models/user.js');

dotenv.config();

const kakaoKey = {
  clientID: process.env.KAKAO_CLIENT_ID,
  clientSecret: process.env.KAKAO_CLIENT_SECRET,
  session: true,
  callbackURL: process.env.KAKAO_CALLBACK_URI
};

passport.use(
  "kakao-login",
  new KakaoStrategy(kakaoKey, (accessToken, refreshToken, profile, done) => {
      
      //console.log(profile);
      //const sql = "select * from user where id = ?";
      //const post = [NewUserId];
      User.findOne(({id: profile.id, username: profile.username, provider: profile.provider}), (err, user) => {
          if(err){
              console.error(err);
              return done(err);
          } else if(!user) { //return res.status(400).json({error: 'user not found'});
              var user = new User();
              user.id = profile.id;
              user.username = profile.username;
              user.provider = profile.provider;
              
              user.save(err => {
                 if(err){
                    console.error(err);
                    return done(err);
                 }
              return done(null, user);     
              })
          } else {
              return done(null, user); 
          }
      })}      
));

passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
  return done(null, user._id); // 여기의 user._id만 req.session.passport.user에 저장
});

passport.deserializeUser((id, done) => { // 매개변수 id는 req.session.passport.user에 저장된 값
    User.findById(id, (err, user) => {
        if(err) return done(err);
        return done(null, user); // 여기의 user가 req.user가 됨
  });
});

module.exports = passport;