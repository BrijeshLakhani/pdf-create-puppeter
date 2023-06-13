const puppeteer = require("puppeteer");
const hbs = require("handlebars");
const fs = require("fs-extra");
const path = require("path");
// const data = require("./data.json");
const Templates = path.resolve("./assests");
console.log("Templates: ", Templates);

// compile hbs to pdf
const complie = async (templateName, document) => {
  const filePath = path.join(process.cwd(), "templates", `${templateName}.hbs`);

  // read html file
  const html = await fs.readFile(filePath, "utf8");

  return hbs.compile(html)(document);
};

// genrate pdf usng puppeteer
const genratePdf = async () => {
  try {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    const document = {
      currentDate: "06/06/2023",
      invoiceNumber: "LIN-564164",
      logo: fs.readFileSync(
        path.resolve(Templates, `PayRight-Logo.png`),
        "base64"
      ),
      TPP: "LIN",
      transactionDetail: [
        {
          _id: "6459db83926563a181a3622c",
          dateOfService: "2/15/2023",
          totalBilling: 176.75,
          serviceCode: "REG",
          hours: 6.25,
          clientName: "DOUGAN BENNE E",
          caregiverName: "FARIAS SHARON",
          service: "CAREGIVER",
        },
        {
          _id: "6459db83926563a181a3622c",
          dateOfService: "2/15/2023",
          totalBilling: 176.75,
          serviceCode: "REG",
          hours: 6.25,
          clientName: "DOUGAN BENNE E",
          caregiverName: "FARIAS SHARON",
          service: "CAREGIVER",
        },
        {
          _id: "6459db83926563a181a3622c",
          dateOfService: "2/15/2023",
          totalBilling: 176.75,
          serviceCode: "REG",
          hours: 6.25,
          clientName: "DOUGAN BENNE E",
          caregiverName: "FARIAS SHARON",
          service: "CAREGIVER",
        },
      ],
      totalAmount: "346.43",
      organizationName: "GRANNY NANNIES",
      payer: {
        _id: "63bd35c5bfe1019b8cbad03e",
        companyName: "LINCOLN BENEFIT LIFE",
        street: "P.O.BOX 4243",
        city: "WOODLAND HILLS",
        state: "CA",
        zip: 91365,
      },
      clientInfo: {
        _id: "63bc1c6b5f033e9763a02901",
        dateOfBirth: "11/10/1935",
        policyNumber: "700052555W",
      },
    };

    // const widthInInches = 8.50;
    // const heightInInches = 11.00;

    // const pixelDensity = 96; // Pixels per inch (default)

    // const widthInPixels = Math.floor(widthInInches * pixelDensity);
    // const heightInPixels = Math.floor(heightInInches * pixelDensity);

    // await page.setViewport({ width: widthInPixels, height: heightInPixels });

    const content = await complie("index", document);

    await page.setContent(content);

    await page.pdf({
      path: "output.pdf",
      format: "A4",
      printBackground: true,
    });


    console.log(
      ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> pdf genrate succesfully >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
    );

    await browser.close();

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

genratePdf();
