<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/foo', function () {
    echo "helo";
});


Route::get('/', function () {
    return view('welcome');
});
Route::get('hello', function(){
    echo "halo ti koji jesi";
});

Route::group(['midleware'=>['web']],function()
{
    Route::get('/', function () {
        return view('welcome');
    })->name('home');
    Route::post('signup',[
        'uses'=>'UserController@postSignUp',
        'as'=>'signup'
    ]);
    Route::post('signin',[
        'uses'=>'UserController@postSignIn',
        'as'=>'signin'
    ]);
    Route::get('/dashboard',[
        'uses'=>'PostController@getDashboard',
        'as'=>'dashboard',
        'middleware'=>'authenticate'

    ]);
    Route::post('/createpost',[
       'uses'=>'PostController@postCreatePost',
        'as'=>'post.create',
         'middleware'=>'authenticate'
    ]);
    Route::get('/delete-post/{post_id}',[
        'uses'=>'PostController@getDeletePost',
        'as'=>'post.delete',
        'middleware'=>'authenticate'
    ]);
});
