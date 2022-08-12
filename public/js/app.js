const socket = io();

$(function () {
  socket.on("socketConnected", () => {
    socket.emit("productListRequest");
    socket.emit("chatMessagesRequest");
  });

  const productForm = $("#formNuevoProducto");
  const productContainer = $("#productList");

  productForm.submit((event) => {
    event.preventDefault();

    const newProduct = {
      title: productForm[0][0].value,
      price: productForm[0][1].value,
      thumbnail: productForm[0][2].value,
    };

    socket.emit("addNewProduct", newProduct);
    productForm.trigger("reset");
  });

  socket.on("updateProductList", productListHandler);

  async function productListHandler(all) {
    const productLayout = await fetch("layouts/productItem.hbs");
    const layoutText = await productLayout.text();
    const compiledHbsTemplate = Handlebars.compile(layoutText);
    const html = compiledHbsTemplate({ all });
    productContainer.empty().append(html);
  }

  // ----------* mensajes de chat *----------//
  const chatForm = $("#messages");
  const chatContainer = $("#menssageContainer");

  chatForm.submit((event) => {
    event.preventDefault();

    const newMessage = {
      author:{
      id:          chatForm[0][0].value,
      nombre:      chatForm[0][1].value,
      apellido:    chatForm[0][2].value,
      edad :       chatForm[0][3].value,
      alias :      chatForm[0][4].value,
      avatar:      chatForm[0][5].value,
      },
      messageText: chatForm[0][6].value,
    };
    socket.emit("addNewMessage", newMessage);
    chatForm.trigger("reset");
  });

  socket.on("updateChatRoom", chatRoomHandler);

  async function chatRoomHandler(allMessages) {
    const chatLayout = await fetch("layouts/chatMessages.hbs");
    const layoutText = await chatLayout.text();
    const compiledHbsTemplate = Handlebars.compile(layoutText);
    const html = compiledHbsTemplate({ allMessages });
    chatContainer.empty().append(html);
  }
});
