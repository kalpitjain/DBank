import { dbank } from "../../declarations/dbank";

function getAmount() {}

window.addEventListener("load", async function () {
  update();

  document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const button = event.target.querySelector("#submit-btn");

    const inputAmount = parseFloat(
      document.getElementById("input-amount").value
    );
    const withdrawalAmount = parseFloat(
      document.getElementById("withdrawal-amount").value
    );

    button.setAttribute("disabled", true);

    if (document.getElementById("input-amount").value.length != 0) {
      await dbank.topUp(inputAmount);
    }

    if (document.getElementById("withdrawal-amount").value.length != 0) {
      await dbank.withdraw(withdrawalAmount);
    }

    await dbank.compund();

    update();

    document.getElementById("input-amount").value = "";
    document.getElementById("withdrawal-amount").value = "";
    button.removeAttribute("disabled");
  });
});

async function update() {
  const currentAmount = await dbank.checkBalance();
  document.getElementById("value").innerText =
    Math.round(currentAmount * 100) / 100;
}
