const client=require('./client')

client.DeleteNews({id:'3'}, (error, news) => {
    if (error) {
      throw error;
    }
    console.log('deleted successfully');
  });