const client=require('./client')

client.addNews({id: "3", title: "two states", body: "written by savn coehlo", postImage: "no image" }, (error, news) => {
    if (error) {
      throw error;
    }
    console.log(news);
  });