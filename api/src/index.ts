import app from './app';
import posts from './routers/posts';

/*
  Routers
*/
app.use('/posts', posts);

app.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});
