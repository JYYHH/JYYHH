var mainModule = angular.module('MainModule', ['ui.select', 'ngSanitize', 'decision.tree']);

mainModule.controller('MainController', ['$decisionTree', function($decisionTree) {
  
  var vm = this;
  
  var RiskFactor = Object.freeze({ "HIGH": "HIGH", "MODERATE": "MODERATE", "LOW": "LOW"});

  var FEDTREE = { risk: RiskFactor.MODERATE, 
    description: 'We recommend <a target="_blank" href="https://github.com/Xtra-Computing/FedTree">FedTree</a> </br> <img src="image/fedtree-logo.png">',
    explanation:'(Can do some explanation here)'
  };
  var PADDLEFL = { risk: RiskFactor.MODERATE, 
    description: 'We recommend <a target="_blank" href="https://github.com/PaddlePaddle/PaddleFL">PaddleFL</a>',
    explanation:'(Can do some explanation here)'
  };
  var TFF = { risk: RiskFactor.MODERATE, 
    description: 'We recommend <a target="_blank" href="https://github.com/tensorflow/federated">TFF</a>',
    explanation:'(Can do some explanation here)'
  };
  var FLUTE = { risk: RiskFactor.MODERATE, 
    description: 'We recommend <a target="_blank" href="https://github.com/microsoft/msrflute">FLUTE</a>',
    explanation:'(Can do some explanation here)'
  };
  var FLOWER = { risk: RiskFactor.MODERATE, 
    description: 'We recommend <a target="_blank" href="https://github.com/adap/flower">Flower</a>',
    explanation:'(Can do some explanation here)'
  };
  var FEDLEARNER = { risk: RiskFactor.MODERATE, 
    description: 'We recommend <a target="_blank" href="https://github.com/bytedance/fedlearner">Fedlearner</a>',
    explanation:'(Can do some explanation here)'
  };
  var FATE = { risk: RiskFactor.MODERATE, 
    description: 'We recommend <a target="_blank" href="https://github.com/FederatedAI/FATE">FATE</a>',
    explanation:'(Can do some explanation here)'
  };
  var FEDML = { risk: RiskFactor.MODERATE, 
    description: 'We recommend <a target="_blank" href="https://github.com/FedML-AI/FedML">FedML</a>',
    explanation:'(Can do some explanation here)'
  };
  var CRYPTEN = { risk: RiskFactor.MODERATE, 
    description: 'We recommend <a target="_blank" href="https://github.com/facebookresearch/CrypTen">CrypTen</a>',
    explanation:'(Can do some explanation here)'
  };
    
  var riskAssessmentTree =
    {
      question: "Is your scenario vertical or horizontal?",
      children: [
        {
          value: "Horizontal",
          question: "Do you need differential privacy (dp-sgd) in training?",
          children: [
            { 
              value: "Yes",
                question: "Which type of models do you need?",
                children: [
                  {
                    value: "Tree-based",
                    result: FEDTREE
                  },
                  {
                    value: "NN-based",
                      question: "Do you need to protect individual gradient with secure aggregation?",
                      children: [
                        {
                          value: "Yes",
                            question: "Do you need multi-host or cross-device deployment?",
                            children: [
                              {
                                value: "Yes",
                                result: PADDLEFL
                              },
                              {
                                value: "No",
                                  question: "Less training time or low memory consumption, which one is more important?",
                                  children: [
                                    {
                                      value: "Less training time",
                                      result: PADDLEFL
                                    },
                                    {
                                      value: "Low memory consumption",
                                      result: TFF
                                    }
                                  ]
                              }
                            ]
                        },
                        {
                          value: "No",
                            question: "Are you only targetting local simulation with memory-efficient client sampling?",
                            children: [
                              {
                                value: "Yes",
                                result: TFF
                              },
                              {
                                value: "No",
                                  question: "Do you have very limited memory for simulation only?",
                                  children: [
                                    {
                                      value: "Yes",
                                      result: PADDLEFL
                                    },
                                    {
                                      value: "No",
                                        question: "Do you prefer model training with a memory-efficient client sampling or a realistic measurement with all clients online during the training?",
                                        children: [
                                          {
                                            value: "With client sampling",
                                            result: FLUTE
                                          },
                                          {
                                            value: "With all clients online",
                                            result: FLOWER
                                          }
                                        ]
                                    }
                                  ]
                              }
                            ]
                        }
                      ]
                  }
                ]
            },
            { 
              value: "No", 
                question: "Which type of models do you need?",
                children: [
                  {
                    value: "Both",
                    result: FATE
                  },
                  {
                    value: "Tree-based",
                    result: FEDTREE
                  },
                  {
                    value: "NN-based",
                      question: "Do you have very limited memory for simulation only?",
                      children: [
                        {
                          value: "Yes",
                            question: "Do you perfer TensorFlow or PyTorch as the ML backend?",
                            children: [
                              {
                                value: "TensorFlow",
                                result: TFF
                              },
                              {
                                value: "PyTorch",
                                result: FEDML
                              }
                            ]
                        },
                        {
                          value: "No",
                            question: "Do you want to use split learning with 1-layer model for training?",
                            children: [
                              {
                                value: "Yes",
                                result: FEDLEARNER
                              },
                              {
                                value: "No",
                                  question: "Do you need to protect individual gradient with secure aggregation?",
                                  children: [
                                    {
                                      value: "Yes",
                                        question: "Do you need multi-host or cross-device deployment?",
                                        children: [
                                          {
                                            value: "Yes",
                                            result: PADDLEFL
                                          },
                                          {
                                            value: "No",
                                              question: "Less training time or low memory consumption, which one is more important?",
                                              children: [
                                                {
                                                  value: "Less training time",
                                                  result: PADDLEFL
                                                },
                                                {
                                                  value: "Low memory consumption",
                                                  result: TFF
                                                }
                                              ]
                                          }
                                        ]
                                    },
                                    {
                                      value: "No",
                                        question: "Are you only targetting local simulation with memory-efficient client sampling?",
                                        children: [
                                          {
                                            value: "Yes",
                                            result: TFF
                                          },
                                          {
                                            value: "No",
                                              question: "Do you have very limited memory for simulation only?",
                                              children: [
                                                {
                                                  value: "Yes",
                                                  result: PADDLEFL
                                                },
                                                {
                                                  value: "No",
                                                    question: "Do you prefer model training with a memory-efficient client sampling or a realistic measurement with all clients online during the training?",
                                                    children: [
                                                      {
                                                        value: "With client sampling",
                                                        result: FLUTE
                                                      },
                                                      {
                                                        value: "With all clients online",
                                                        result: FLOWER
                                                      }
                                                    ]
                                                }
                                              ]
                                          }
                                        ]
                                    }
                                  ]
                              }
                            ]
                        }
                      ]
                  }
                ]
            }
          ]
        },
        {
          value: "Vertical",
            question: "Do you need differential privacy (dp-sgd) in training?",
            children: [
              {
                value: "Yes",
                  question: "Which type of models do you need?",
                  children: [
                    {
                      value: "Tree-based",
                      result: FEDTREE
                    },
                    {
                      value: "NN-based",
                      result: PADDLEFL
                    }
                  ]
              },
              {
                value: "No",
                  question: "Which type of models do you need?",
                  children: [
                    {
                      value: "Both",
                        question: "Is the threat model in split learning acceptable?",
                        children: [
                          {
                            value: "Yes",
                              question: "Less communication frequency or low memory consumption, which one is more important?",
                              children: [
                                {
                                  value: "Less communication",
                                  result: FATE
                                },
                                {
                                  value: "Low memory",
                                  result: FEDLEARNER
                                }
                              ]
                          },
                          {
                            value: "No",
                            result: FATE
                          }
                        ]
                    },
                    {
                      value: "Tree-based",
                        question: "Is less training time more important than low communication frequency and low memory usage?",
                        children: [
                          {
                            value: "Yes",
                            result: FEDTREE
                          },
                          {
                            value: "No",
                              question: "Is the threat model in split learning acceptable?",
                              children: [
                                {
                                  value: "Yes",
                                    question: "Less communication frequency or low memory consumption, which one is more important?",
                                    children: [
                                      {
                                        value: "Less communication",
                                        result: FATE
                                      },
                                      {
                                        value: "Low memory",
                                        result: FEDLEARNER
                                      }
                                    ]
                                },
                                {
                                  value: "No",
                                  result: FATE
                                }
                              ]
                          }
                        ]
                    },
                    {
                      value: "NN-based",
                        question: "Do you need to train large NN models?",
                        children: [
                          {
                            value: "Yes",
                            result: CRYPTEN
                          },
                          {
                            value: "No",
                              question: "Is large communication cost bearable?",
                              children: [
                                {
                                  value: "Yes",
                                    question: "Do you plan to use split learning?",
                                    children: [
                                      {
                                        value: "Yes",
                                        result: FEDLEARNER
                                      },
                                      {
                                        value: "No",
                                        result: FATE
                                      }
                                    ]
                                },
                                {
                                  value: "No",
                                    question: "Is the threat model in split learning acceptable?",
                                    children: [
                                      {
                                        value: "Yes",
                                          question: "Less communication frequency or low memory consumption, which one is more important?",
                                          children: [
                                            {
                                              value: "Less communication",
                                              result: FATE
                                            },
                                            {
                                              value: "Low memory",
                                              result: FEDLEARNER
                                            }
                                          ]
                                      },
                                      {
                                        value: "No",
                                        result: FATE
                                      }
                                    ]
                                }
                              ]
                          }
                        ]
                    }
                  ]
              }
            ]
        }
        
      ]
    };

	function tweak(tree, tweaker) {
	  tweaker(tree);
	  angular.forEach(tree.children, function (value) {
	    tweak(value, tweaker);
	    
	  });
	  
	  return tree;
	}

	vm.decisionTreeModes = [
		{ label: "ALL Buttons", tree: riskAssessmentTree },
		{ label: "ALL Selects", tree: tweak(
			angular.copy(riskAssessmentTree),
			function (child) {
				if (child.children) {
					child.selector = "drop-down";
				}
			}
		) },
		{ label: "Mixed (DDs when > 4 options)", tree: tweak(
			angular.copy(riskAssessmentTree),
			function (child) {
				if (child.children && child.children.length > 4) {
					child.selector = "drop-down";
				}
			}
		) }
	];
	vm.selectedDecisionTreeMode = vm.decisionTreeModes[0];

  vm.openDecisionTreeWizard = function () {
    
    $decisionTree.openWizard(
      {
        title: 'Understand your workload, find the most similar scenario in our list',
        resultTemplateUrl: 'risk-assessment-result.html',
        decisionTree: vm.selectedDecisionTreeMode.tree
      }  
    ).then(
      function (result) {
        vm.result = result;
      }
    );
  };

}]);

mainModule.directive('decisionTreeResult', function () {
  return {
    restrict: 'E',
    scope: {
      result: '='
    },
    templateUrl: 'risk-assessment-result.html'
  }
});
