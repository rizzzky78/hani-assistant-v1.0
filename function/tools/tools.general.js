const chalk = require("chalk");

class Tools {
  /**
   *
   * @param { 'open' | 'connecting' | 'close' } state
   */
  static mapConnections(state) {
    const v = {
      open: chalk.greenBright("Online"),
      connecting: chalk.yellowBright("Connecting..."),
      close: chalk.redBright("Disconnected"),
    };
    return v[state];
  }
  /**
   * Map Input data
   * @param { number } num Number input
   * @param { boolean } opt Options, default `false`
   * @returns { Example<"12.000" | "Rp.12.000"> }
   */
  static localePrice(num, opt = false) {
    const mapped = num.toLocaleString("id-ID");
    return opt ? mapped : `Rp.${mapped},-`;
  }

  /**
   *
   * @param { "u" | "l" | "n" } c Case
   * @param { Array<string> } d Data input
   * @description
   * - `"u"` are for uppercase, `["abc"] => ["ABC"]`
   * - `"l"` for lowercase, `["ABC"] => ["abc"]`
   * - `"n"` for normal trimmed, `[" a", "b ", "c"] => ["a", "b", "c"]`
   */
  static arrayModifier(c, d) {
    /**
     * @type { { [k: string]: (v: string) => string } }
     */
    const mod = {
      u: (v) => v.trim().toUpperCase(),
      l: (v) => v.trim().toLowerCase(),
      n: (v) => v.trim(),
    };
    const data = d ? d : [""];
    return data.map(mod[c]);
  }

  /**
   *
   * @param { string } filename filename
   * @param { import("./types").CreatePDFDto } dto Data-Transfer-Object
   */
  static async XxxcreatePDF(
    filename,
    {
      title,
      thead,
      tbody,
      fontSize = 9,
      bodyNote = "",
      titleAlign = "center",
      titlePos = "normal",
    }
  ) {
    // logger.info("Creating PDF file...");
    console.log("Creating PDF...");
    const { jsPDF } = require("jspdf");
    const { readFileSync } = require("fs");
    require("jspdf-autotable");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    const pos = {
      vx: titlePos === "normal" ? 105 : 15,
      vy: titlePos === "normal" ? 15 : 35,
    };

    const imgData = new Uint8Array(readFileSync("./assets/image/hni-logo.png"));
    pdf.addImage(imgData, "PNG", 15, 10, 16, 16);

    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(132, 196, 76);
    pdf.text("Halal Mart BC Cilacap 3", 35, 15, { align: "left" });

    pdf.setFontSize(6);
    pdf.setTextColor(25, 25, 25);
    pdf.setFont("helvetica", "normal");
    pdf.text(
      "Alamat:\nJl. Nusa Indah, Gligir, Kesugihan Kidul, Kec. Kesugihan, Kabupaten Cilacap, Jawa Tengah 53272\nWA: 08123456789",
      35,
      20,
      { align: "left" }
    );

    pdf.setFontSize(titlePos === "normal" ? 12 : 8);

    pdf.setTextColor(25, 25, 25);
    pdf.text(title, pos.vx, pos.vy, {
      align: titleAlign,
    });

    pdf.autoTable({
      head: [thead],
      body: tbody,
      startY: titlePos === "normal" ? 30 : 55,
      styles: { fontSize, halign: "start" },
      theme: "grid",
    });
    if (bodyNote) {
      const totalPages = pdf.internal.getNumberOfPages();
      const currentPage = pdf.internal.getCurrentPageInfo().pageNumber;
      if (currentPage === totalPages) {
        pdf.setFontSize(7);
        pdf.text(bodyNote, 105, pdf.internal.pageSize.height - 10, {
          align: "center",
        });
      }
    }
    const paths = `./assets/temp/${filename}.pdf`;
    pdf.save(paths);
    // logger.info("Success create PDF!");
    console.log("Success create PDF!");
    return readFileSync(paths);
  }

  /**
   *
   * @param { import("./types").CustomOptionalDocs } o
   */
  static customAligmentCells(o) {
    /**
     * @type { import("./types").MapPremadeCells }
     */
    const map = {
      product: {
        0: { halign: "center" },
        1: { halign: "center" },
        4: { halign: "center" },
      },
      order: {
        0: { halign: "center" },
        1: { halign: "center" },
        2: { halign: "center" },
        4: { halign: "center" },
        5: { halign: "center" },
        6: { halign: "center" },
      },
      transaction: {
        0: { halign: "center" },
        2: { halign: "center" },
        3: { halign: "center" },
        6: { halign: "center" },
      },
      completedorder: {
        0: { halign: "center" },
        2: { halign: "center" },
        4: { halign: "center" },
        5: { halign: "center" },
      },
      invoice: {
        0: { halign: "center" },
        1: { halign: "center" },
        2: { halign: "center" },
        3: { halign: "center" },
        4: { halign: "center" },
      },
      customerorder: {
        0: { halign: "center" },
        1: { halign: "center" },
        2: { halign: "center" },
        4: { halign: "center" },
        5: { halign: "center" },
      },
    };
    if (typeof o === "object") {
      return o;
    }
    return map[o];
  }

  /**
   * **Create PDF JS**
   * @param { string } filename
   * @param { import("./types").CreatePDFDto } dto
   */
  static async createPDF(filename, dto) {
    const {
      title,
      thead,
      tbody,
      footerNote,
      tableFontSize = 9,
      createSubTable,
      subTable,
      forceAlignCells,
      preferSelectOptCellsAlign,
    } = dto;
    /* ========= initializer ========= */
    const { jsPDF } = require("jspdf");
    const { readFile } = require("fs/promises");
    const { readFileSync } = require("fs");
    require("jspdf-autotable");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    /* ========= initializer ========= */
    // logger.info("Creating PDF...");

    /* ========= cope PDF ========= */
    // const imgData = new Uint8Array(readFileSync("./assets/image/hni-logo.png"));
    const imgData = new Uint8Array(
      readFileSync("./assets/image/template-logo.png")
    );
    pdf.addImage(
      imgData,
      "PNG",
      15, // x
      10, // y
      16, // width
      16 // height
    );
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(132, 196, 76);
    // pdf.text("Halal Mart BC Cilacap 3", 35, 15, { align: "left" });
    pdf.text("Your Brands Here!", 35, 15, { align: "left" });

    pdf.setFontSize(6);
    pdf.setTextColor(39, 40, 41);
    pdf.setFont("helvetica", "normal");
    // pdf.text(
    //   `Alamat:\nJl. Nusa Indah, Gligir, Kesugihan Kidul, Kec. Kesugihan, Kabupaten Cilacap, Jawa Tengah 53272\nWA: 08123456789`,
    //   35,
    //   20,
    //   { align: "left" }
    // );
    pdf.text(
      `Alamat:\nJl. Nin Aja Dulu, Siapa Tau Sukses : ), Kota. Meikarta\nWA: 08123456789`,
      35,
      20,
      { align: "left" }
    );
    /* ========= cope PDF ========= */

    /* ========= sub title/table PDF ========= */
    if (createSubTable) {
      const { subTitle, subThead, subTbody } = subTable;
      pdf.setFontSize(7.5);
      pdf.text(subTitle, 15, 38, { align: "left" });
      pdf.autoTable({
        head: [subThead],
        body: subTbody,
        startY: 40,
        headStyles: {
          fillColor: [33, 139, 72],
          textColot: [255, 255, 236],
          fontStyle: "bold",
          valign: "middle",
          halign: "center",
        },
        bodyStyles: {
          valign: "middle",
          halign: "center",
        },
        styles: { fontSize: tableFontSize, halign: "start" },
        theme: "grid",
      });
      pdf.text(title, 15, 68, { align: "left" });
    }
    /* ========= sub title/table PDF ========= */

    /* ========= main table PDF ========= */
    if (!createSubTable) {
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "bold");
      pdf.text(title, 105, 40, { align: "center" });
    }

    pdf.autoTable({
      head: [thead],
      body: tbody,
      startY: createSubTable ? 70 : 44,
      theme: "grid",
      styles: { fontSize: tableFontSize, halign: "start" },
      headStyles: {
        fillColor: [132, 196, 76],
        textColot: [255, 255, 236],
        fontStyle: "bold",
        valign: "middle",
        halign: "center",
      },
      bodyStyles: {
        valign: "middle",
        // halign: "center",
      },
      columnStyles: this.customAligmentCells(preferSelectOptCellsAlign),
    });
    /* ========= main table PDF ========= */

    /* ========= footer PDF ========= */
    if (footerNote) {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7);
      pdf.text(footerNote, 105, pdf.internal.pageSize.height - 10, {
        align: "center",
      });
    }
    /* ========= footer PDF ========= */
    const paths = `./assets/temp/${filename}.pdf`;
    pdf.save(paths);
    // logger.info("Success create PDF!");
    return await readFile(paths);
  }

  /**
   * Append checking user/accessor, if exist it will return `true`,
   * if not it will append user data into JSON and return `false`
   * @param { string } phoneNumber
   * @returns
   */
  static checkUser(phoneNumber) {
    const { readFileSync, writeFileSync } = require("fs");
    const path = "./store/log/logger.user.json";
    const logUser = {
      timeStamp: new Date().toISOString(),
      phoneNumber,
    };
    /**
     * @type { typeof logUser[] }
     */
    const userLogs = JSON.parse(readFileSync(path, "utf-8"));
    const isExist = userLogs.some((u) => u.phoneNumber === phoneNumber);
    if (isExist) {
      return true;
    } else {
      userLogs.push(logUser);
      writeFileSync(path, JSON.stringify(userLogs, null, 2));
      return false;
    }
  }

  /**
   * Create a log entry based on the specified level and information.
   * @param { "info" | "error" | "cmd" } level - Log level ("info", "error", or "cmd").
   * @param { { id: string; username: string; cmd: string; args: string } | string } info
   */
  static createLog(level, info) {
    const { readFileSync, writeFileSync, existsSync } = require("fs");
    const cryptoRandomString = require("crypto-random-string");
    const pathJson = `./store/log/system-log-${level}.json`;
    /**
     * @type { Array<{ level: typeof level; timeStamp: string; logs: typeof info }> }
     */
    const existingLogs = existsSync(pathJson)
      ? JSON.parse(readFileSync(pathJson, "utf8"))
      : [];
    existingLogs.push({
      level,
      pid: cryptoRandomString(15).toLowerCase(),
      timeStamp: new Date().toISOString(),
      logs: level === "cmd" ? { ...info } : info,
    });
    writeFileSync(pathJson, JSON.stringify(existingLogs, null, 2));
  }

  /**
   *
   * @param { "day" | "month" | "year" | "full" | null } options
   * @returns
   */
  static getDate(options = null) {
    const formatter = new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
    const currentDate = new Date();
    const monthNamesId = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const map = {
      day: currentDate.toLocaleString("id-ID", { weekday: "long" }),
      month: monthNamesId[currentDate.getMonth()],
      year: currentDate.getFullYear().toString(),
      full: [
        currentDate.toLocaleString("id-ID", { day: "2-digit" }),
        monthNamesId[currentDate.getMonth()],
        currentDate.getFullYear().toString(),
      ].join(" "),
    };
    if (options) {
      return map[options];
    }
    return formatter.format(new Date()).replace(/\,/g, "").replace(".", ":");
  }

  /**
   * Perform checking time, if input time is less than 11:00 WIB
   * it will return `true`, otherwise `false`.
   * @param { string } orderTime Output from `Tools.getDate()`
   * @param { string } cutoff Default is `11:00` WIB
   */
  static isSameDay(orderTime, cutoff = "11:00") {
    const moment = require("moment-timezone");
    const cutoffTime = moment(cutoff, "HH:mm");
    const orderDateTime = moment(orderTime, "dddd DD MMM YYYY HH:mm");
    return orderDateTime.isBefore(cutoffTime) ? true : false;
  }

  /**
   * Get the uptime of the application formatted as days, hours, minutes, and seconds.
   * @returns { string } The formatted uptime string.
   */
  static uptimeApp() {
    /**
     * Format the given number of seconds into days, hours, minutes, and seconds.
     * @param { number } seconds - The number of seconds to format.
     * @returns { string } The formatted time string.
     */
    function formatTime(seconds) {
      seconds = Number(seconds);
      const days = Math.floor(seconds / (3600 * 24));
      const hours = Math.floor((seconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      /**
       * Format a unit with its corresponding label.
       * @param { number } value - The value of the unit.
       * @param { string } unit - The label for the unit.
       * @returns { string } The formatted unit string.
       */
      function formatUnit(value, unit) {
        return value > 0 ? `${value} ${unit}${value === 1 ? "" : "s"}, ` : "";
      }
      return `${formatUnit(days, "Day")}${formatUnit(
        hours,
        "Hour"
      )}${formatUnit(minutes, "Minute")}${formatUnit(
        remainingSeconds,
        "Second"
      )}`.slice(0, -2);
    }
    return formatTime(process.uptime());
  }

  /**
   *
   * @param { string } user
   */
  static countAndValidateAppUsed(user) {
    const { readFileSync, writeFileSync, existsSync } = require("fs");
    const cryptoRandomString = require("crypto-random-string");
    const pathJson = `./store/log/system-app-used.json`;
    /**
     * @type { Array<{ date: string; id: string; hash: string }> }
     */
    const appUsedLogs = existsSync(pathJson)
      ? JSON.parse(readFileSync(pathJson, "utf8"))
      : [];
    if (appUsedLogs.length > 15) {
      console.log("MASA TRIAL HABIS, SILAHKAN KOMTAK DEVELOPER.");
      return false;
    }
    if (appUsedLogs.length < 15) {
      appUsedLogs.push({
        hash: cryptoRandomString(17),
        date: new Date().toISOString(),
        id: user,
      });
      writeFileSync(pathJson, JSON.stringify(appUsedLogs, null, 2));
      return false;
    }
  }

  /**
   * Temporary
   * @param { import("@interface/payment").CustomerPaymentProof } dto
   */
  static _Exclude(dto) {
    const {
      timeStamp,
      isVerified,
      metadata,
      payer,
      payment: { via, nominal },
    } = dto;
    /**
     * @type { Partial<import("@interface/payment").CustomerPaymentProof> }
     */
    const data = {
      timeStamp,
      isVerified,
      metadata,
      payer,
      payment: {
        via,
        nominal,
      },
    };
    return data;
  }
}

module.exports = Tools;
