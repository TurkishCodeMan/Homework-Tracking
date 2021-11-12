"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.deleteHomework = deleteHomework;
exports.readAll = readAll;
exports.readUserHomework = readUserHomework;
exports.completeHomework = completeHomework;

var _authMethod = require("./auth-method");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var homeworksKey = '__homeworks__';
var homeworks = {};

var persist = function persist() {
  return window.localStorage.setItem(homeworksKey, JSON.stringify(homeworks));
};

var load = function load() {
  return Object.assign(homeworks, JSON.parse(window.localStorage.getItem(homeworksKey)));
}; // initialize


try {
  load();
  homeworks = _toConsumableArray(Object.values(homeworks));
  persist();
} catch (error) {
  persist(); // ignore json parse error
}

window.__myApp = window.__myApp || {};

window.__myApp.purgeStudents = function () {
  Object.keys(homeworks).forEach(function (key) {
    delete homeworks[key];
  });
  persist();
};

function read(id) {
  return regeneratorRuntime.async(function read$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", homeworks[id]);

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

function readAll() {
  return regeneratorRuntime.async(function readAll$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log(homeworks);
          return _context2.abrupt("return", Array.from(homeworks));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function readUserHomework(userId) {
  var homeWorkArray;
  return regeneratorRuntime.async(function readUserHomework$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          homeWorkArray = Array.from(homeworks);
          return _context3.abrupt("return", homeWorkArray.filter(function (hm) {
            return hm.studentId === userId;
          }));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function create(_ref) {
  var subject, studentId, teacherId, completed, deadLine, id;
  return regeneratorRuntime.async(function create$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          subject = _ref.subject, studentId = _ref.studentId, teacherId = _ref.teacherId, completed = _ref.completed, deadLine = _ref.deadLine;
          id = (0, _authMethod.hash)("".concat(studentId).concat(teacherId).concat(Math.random(2000) + 1));
          homeworks.push({
            id: id,
            subject: subject,
            deadLine: new Date(deadLine),
            completed: completed,
            studentId: studentId,
            teacherId: teacherId
          });
          persist();
          return _context4.abrupt("return", read(id));

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function deleteHomework(homeWorkId) {
  var newHomeWorks;
  return regeneratorRuntime.async(function deleteHomework$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          newHomeWorks = Array.from(homeworks).filter(function (hm) {
            return hm.id !== homeWorkId;
          });
          homeworks = _toConsumableArray(newHomeWorks);
          persist();
          return _context5.abrupt("return", true);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
}

var convertArrayToObject = function convertArrayToObject(array, key) {
  return (// eslint-disable-next-line no-sequences
    array.reduce(function (acc, item) {
      return acc[item[key]] = item, acc;
    }, {})
  );
};

function completeHomework(homeWorkId) {
  var hmObject;
  return regeneratorRuntime.async(function completeHomework$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          hmObject = convertArrayToObject(homeworks, "id");
          hmObject[homeWorkId].completed = !hmObject[homeWorkId].completed;
          homeworks = _toConsumableArray(Object.values(hmObject));
          persist();
          return _context6.abrupt("return", true);

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  });
} // async function completeHomework(studentId,homeWorkId){
//     const student=studentsDB.find((st=>st.id===studentId))
// }