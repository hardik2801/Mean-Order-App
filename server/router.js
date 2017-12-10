module.exports =  function(app){
    app.use('/', appRequire('router.web'));
};