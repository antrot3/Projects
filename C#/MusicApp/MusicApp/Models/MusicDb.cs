﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;


namespace MusicApp.Models
{
    public class MusicDb : DbContext
    {
     
        public DbSet<Music> Musics { get; set; }
    }
}