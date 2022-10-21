# Create vite project
```
yarn create vite
```

## Start project
```
yarn install
yarn dev
```

## Install React-router-dom
```
yarn add react-router-dom@6
```

## Install Boostrap CDN
```
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
```

## Install FontAwesome [https://cdnjs.com/libraries/font-awesome]
```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
```

## __.env__
Create file ```.env and README.md``` and add in __.gitignore__

## Create routes in project
Create dir ```router``` and file __AppRouter.jsx__

### Create routes public and private
```
<Routes>
  {
    (authStatus === 'notauthenticated')
    ? <Route path="/auth/*" element={ <Component1 /> }/>
    : <Route path="/*" element={ <Component2 /> }/>
  }
  
  <Route path="/*" element={ <Navigate to="/auth/login" /> }/>
</Routes>
```

### Wrap the highest point of application with browserRouter
```
<BrowserRouter>
  <AppRouter />
</BrowserRouter>
```

## React big calendar
```
yarn add react-big-calendar
yarn add date-fns
```

## React Modal [https://www.npmjs.com/package/react-modal]
```yarn add react-modal```

## React datePicker [https://www.npmjs.com/package/react-datepicker]
```yarn add react-datepicker```

## SweetAlert
```yarn add sweetalert2```

## Redux toolKit [https://redux-toolkit.js.org/]
```yarn add @reduxjs/toolkit```
```yarn add react-redux```

## SerializableCleck
If have a error date add in __store.js__
```
middleware: ( getDefaultMiddleware ) => getDefaultMiddleware({
    serializableCheck: false
  })
```