import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

import static spark.Spark.*;

class MessageDto{
  String userName;
  String message;
}

public class SparkDemo {

  public static void main(String[] args) {
    port(1234);
    Gson gson = new Gson();
    List<MessageDto> messages = new ArrayList<>();

    get("/hello", (req, res) -> "asd");

    post("/submitMessage", (req, res) -> {
      String body = req.body();
      MessageDto messageDto = gson.fromJson(body, MessageDto.class);
      messages.add(messageDto);
      System.out.println(body);
      return "Submit message";
    });

    get("/getMessages", (req, res) -> {
      return gson.toJson(messages);
    });
  }
}
