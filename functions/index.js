// const functions = require("firebase-functions");
// const {initializeApp} = require("firebase-admin/app");

// const cors=require("cors")({
//     origin: true
// });

// var admin = require("firebase-admin");
// var serviceAccount=require("./serviceAccount.json");


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started


// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

// exports.callFcm=functions.https.onRequest((request, response) =>{
//     cors(request, response), () => {
//         const title=request.query.title;
//         const body=request.query.body;
//         const token = "";

//         const payload = {
//             notification: {
//                 title: title,
//                 body : body
//             },
//             token: token
//         };


//         admin.messaging().send(payload).then(function(res){
//             response.send({ // 호출해야 호출이 끝남
//                 code: 200,
//                 message: "success"
//             });
//         }).catch(function(err){
//             response.send({
//                 code: 500,
//                 message : `${err}`
//             });
//         });
//     }
// });


// exports.helloWorld = functions.https.onRequest((request, response) => {

//   const name = request.query.name;

//   functions.logger.info("Hello logs!", {structuredData: true});


//   response.send(`Hello from Firebase! ${name}`);
// });



// // firebase login
// // firebase emulators:start
// // firebase deploy => 코드 작성 이후에 배포함


// // 서버보안조치 : serviceAccount 보호를 위한 조치가 필요함.


// // https://us-central1-app-push-20221210.cloudfunctions.net/callFcm

// // CORB 문제 해결 필요 => 해결방법은?
// // 지난 번에는 푸시를 잘 호출할 수 있었지만 cors에 대한 문제가 발생하여 다음으로 못 넘어가고 있음.
// // 노드버전을 변경하여 적용하였으나 여전히 안됨.



//index.js
const functions = require("firebase-functions");
const { initializeApp } = require('firebase-admin/app');

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccount.json");
var express = require('express');
var app = express();


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  const hello = request.query.name;
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send(`Hello from ${hello}!`);
});

exports.callFcm = functions.https.onRequest((req, res) => {
    const title = "mTitle";//req.query.title;
    const body = "mBody";//req.query.body;

    const token=req.query.token;

    // const token = "e46SfF38T3Kxb0n8aF_mRw:APA91bGNDse8CtvrWafvdAFlOtfjsHmz9JmoXXQEzQcWUChPJmdu4Yal1mwGSThk38n25okXKp8ac4Fv_sXEeazuWMcrDLlybFeZACypRtxn5XdffSsjf_XLyH9o05mhzs-lUItpB3sy";//req.query.token;
    const name = "Gilbert";
    const address = "서울 광진구";

    const payload = {
        notification: {
            title: title,
            body: body
        },
        data: {
            name: name,
            address: address
        },
        token: token
    };

    admin.messaging().send(payload)
    .then(function(response){
        res.send({
            code: 200,
            message: "successs"
        });
    }).catch(function(err) {
        res.send({
            code: 400,
            message: `${err}`
        });
    });


    // todo 
    
    // 1. 앱이 꺼져 있을 때 보내기

    // 2. 앱이 켜져 있을 때 보내기

    // 3. 디비에서 현재 접속한 유저 토큰 가져오기

    // 4. 디비에서 모든 유저 토큰 가져오기

    // 5. 한 개의 대상에만 보내기

    // 4. 전체를 대상으로 보내기

    


    //POST https://fcm.googleapis.com/v1/{parent=projects/*}/messages:send
    //app.get('https://fcm.googleapis.com/v1/{parent=projects/*}/messages:send', functions(request, response){

});