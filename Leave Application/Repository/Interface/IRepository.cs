﻿using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace Leave_Application.Repository.Interface
{
   public interface IRepository<T, X>
        where T : class
    {
        Task<List<T>> Get();
        Task<T> Get(X id);
        HttpStatusCode Post(T entity);
        HttpStatusCode Put(T entity);
        HttpStatusCode Delete(X id);
    }
}
