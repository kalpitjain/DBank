import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank{
  var currentAmount: Float = 100;
  // currentAmount:= 100;

  stable var startTime = Time.now();

  public func topUp(amount: Float){
    currentAmount += amount;
    Debug.print(debug_show(currentAmount));
  };

  public func withdraw(amount: Float){
    let temp: Float = currentAmount-amount;
    if(temp>=0){
      currentAmount -= amount;
      Debug.print(debug_show(currentAmount));
    }else{
      Debug.print(debug_show("Amount too large"));
    }
  };

  public query func checkBalance():async Float{
    return currentAmount;
  };

  public func compund(){
    let currentTime = Time.now();

    let timeElapsedInDays = (currentTime - startTime)/(1000000000*60*60*24);

    currentAmount := currentAmount * (1.01 ** Float.fromInt(timeElapsedInDays));

    startTime := currentTime;

  };

}