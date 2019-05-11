export default {   
    User: {
        properties: (parent, args, context, info) => parent.getProperties(),
      },   
    Property: {
        user: (parent, args, context, info) => parent.getUser(),
      },
    Query: {  
      search: async (parent, args, { db, Op }, info) => {
        
          const results = await db.property.findAll({
            where: {
              [Op.or]: [
                {
                  street: {
                    [Op.iLike]: '%'+args.filter+'%'
                  }
                },
                {
                  city: {
                    [Op.iLike]: '%'+args.filter+'%'
                  }
                },
                {
                  state: {
                    [Op.iLike]: '%'+args.filter+'%'
                  }
                },
                {
                  zip: {
                    [Op.iLike]: '%'+args.filter+'%'
                  }
                },    
                {
                  '$user.firstName$': {
                    [Op.iLike]: '%'+args.filter+'%'
                  }
                },  
                {
                  '$user.lastName$': {
                    [Op.iLike]: '%'+args.filter+'%'
                  }
                },                  
                
              ]
            },
          include: [{
                model: db.user,                
            }]
          });
          return results;
      }      
    }    
  };
  