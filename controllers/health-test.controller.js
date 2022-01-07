const TestModel = require("../models/health-test.model");

class TestController {
  static async createNewTest(req, res) {
    try {
      const NewTest = new TestModel(req.body);
      const saved = await NewTest.save();
      res.status(201).json({
        message: "New Test added",
        test: saved,
      });
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async getAllTest(req, res) {
    try {
      const testList = await TestModel.find();
      res.status(200).send(testList);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async getTestByID(req, res) {
    try {
      const id = req.params.id;

      const testList = await TestModel.findOne({
        _id: id,
      });
      res.status(200).send(testList);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async updateTest(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      const question = body.question;
      const answer = body.answer;

      const testList = await TestModel.updateOne(
        { _id: id },
        {
          question: question,
          answer: {
            cemas: "tidak pernah",
            stress: "sering",
            depresi: "selalu",
          },
        }
      );
      res.status(200).send(body);
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }

  static async deleteTest(req, res) {
    try {
      const id = req.params.id;
      await TestModel.deleteOne({ _id: id });
      res.status(200).send({ message: `${id} has been deleted` });
    } catch (error) {
      res.status(500).send({ err: error });
    }
  }
}
module.exports = TestController;
