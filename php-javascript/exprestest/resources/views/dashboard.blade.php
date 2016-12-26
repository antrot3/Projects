@extends('template.master')
@section('content')
    @include('includes.message-block')
    <section class="row new post">
        <div class="col-md-6 col-md-offset-3">
            <header><h3>What do you have to say for yourself</h3></header>
            <form action="{{route('post.create')}}" method="post">
                <div class="form-group">
                    <textarea class="form-control" name="body" id="new-post" rows="5" placholder="Your post"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Create post</button>
                <input type="hidden" value="{{Session::token()}}" name="_token">
            </form>
        </div>
    </section>
    <section class="row-post">
        <div class="col-md-6 col-md-offset-3">
            <header><h3>What do other people say</h3></header>
            @foreach($posts as $post)
                <article class="post">
                    <p>{{$post->body}}</p>
                    <div class="info">
                        Posted by {{$post->user->first_name}}on {{$post->user->created_at}}
                    </div>
                    <div class="interaction">
                        <a href="#">Like</a>
                        <a href="#">Dislake</a>
                        <a href="#">Edit</a>
                        <a href="{{route('post.delete', ['post_id'=>$post->id])}}">Delate</a>
                    </div>
                </article>
                @endforeach


        </div>

    </section>
    @endsection()