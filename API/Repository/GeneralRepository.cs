using API.Context;
using API.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace API.Repository
{
    public class GeneralRepository<Context, Entity, Key> : IRepository<Entity, Key>
        where Context : MyContext
        where Entity : class
    {
        private readonly MyContext myContext;
        private readonly DbSet<Entity> entities;
        public GeneralRepository(MyContext myContext)
        {
            this.myContext = myContext;
            this.entities = myContext.Set<Entity>();
        }
        public int Delete(Key key)
        {
            try
            {
                Entity e = entities.Find(key);
                entities.Remove(e);
                //myContext.Entry(e).State = EntityState.Deleted;
                var delete = myContext.SaveChanges();
                return delete;
            }
            catch (ArgumentNullException ex)
            {
                return 0;
            }
        }

        public IEnumerable<Entity> Get()
        {
            return entities.ToList();
        }

        public Entity Get(Key key)
        {
            try
            {
                var getData = entities.Find(key);
                return getData;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public IEnumerable<Entity> GetJoinUD()
        {
            return entities.ToList();
        }

        public int Insert(Entity e)
        {
            try
            {
                myContext.Entry(e).State = EntityState.Added;
                var insert = myContext.SaveChanges();
                return insert;
            }
            catch (DbUpdateException)
            {
                return 0;
            }
        }

        public int Update(Entity e, Key key)
        {
            try
            {
                ////var dataCari =  myContext.Employees.Find(nik);
                //var dataCari = entities.Find(key);
                //dataCari = e;
                //entities.Attach(dataCari);

                //var entry = myContext.Entry(e);
                //entry.State = EntityState.Modified;
                myContext.Entry(e).State = EntityState.Modified;
                var ok = myContext.SaveChanges();
                return ok;

            }
            catch (ArgumentNullException ex)
            {
                return 0;
            }
            catch (DbUpdateConcurrencyException)
            {
                return 0;
            }
            catch (NullReferenceException ex)
            {
                return 0;
            }
        }
    }
}
