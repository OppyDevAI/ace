"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var DocCommentHighlightRules = function() {
    this.$rules = {
        "start": [
            {
                token: ["comment.doc.tag", "text", "lparen.doc"],
                regex: "(@(?:param|member|typedef|property|namespace|var|const|callback))(\\s*)({)",
                push: [
                    {
                        token: "lparen.doc",
                        regex: "{",
                        push: [
                            {
                                include: "doc-syntax"
                            }, {
                                token: "rparen.doc",
                                regex: "}|(?=$)",
                                next: "pop"
                            }
                        ]
                    }, {
                        token: ["rparen.doc", "text", "variable.parameter.doc", "lparen.doc", "variable.parameter.doc", "rparen.doc"],
                        regex: /(})(\s*)(?:([\w=:\/\.]+)|(?:(\[)([\w=:\/\.]+)(\])))/,
                        next: "pop"
                    }, {
                        token: "rparen.doc",
                        regex: "}|(?=$)",
                        next: "pop"
                    }, {
                        include: "doc-syntax"
                    }, {
                        defaultToken: "text"
                    }
                ]
            }, {
                token: ["comment.doc.tag", "text", "lparen.doc"],
                regex: "(@(?:returns?|yields|type|this|suppress|public|protected|private|package|modifies|" 
                    + "implements|external|exception|throws|enum|define|extends))(\\s*)({)",
                push: [
                    {
                        token: "lparen.doc",
                        regex: "{",
                        push: [
                            {
                                include: "doc-syntax"
                            }, {
                                token: "rparen.doc",
                                regex: "}|(?=$)",
                                next: "pop"
                            }
                        ]
                    }, {
                        token: "rparen.doc",
                        regex: "}|(?=$)",
                        next: "pop"
                    }, {
                        include: "doc-syntax"
                    }, {
                        defaultToken: "text"
                    }
                    ]
            }, {
                token: ["comment.doc.tag", "text", "variable.parameter.doc"],
                regex: "(@(?:alias|memberof|instance|module|name|lends|namespace|external|this|template|" 
                    + "requires|param|implements|function|extends|typedef|mixes|constructor|var|" 
                    + "memberof\\!|event|listens|exports|class|constructs|interface|emits|fires|" 
                    + "throws|const|callback|borrows|augments))(\\s+)(\\w[\\w#\.:\/~\"\\-]*)?",
            }, {
                token: ["comment.doc.tag", "text", "variable.parameter.doc"],
                regex: "(@method)(\\s+)(\\w[\\w\.\\(\\)]*)",
            }, {
                token: "comment.doc.tag",
                regex: "@access\\s+(?:private|public|protected)",
            }, {
                token: "comment.doc.tag",
                regex: "@kind\\s+(?:class|constant|event|external|file|function|member|mixin|module|namespace|typedef)",
            }, {
                token: "comment.doc.tag",
                regex: "@\\w+(?=\\s|$)",
            },
        DocCommentHighlightRules.getTagRule(),
        {
            defaultToken : "comment.doc",
            caseInsensitive: true
        }],
        "doc-syntax": [{
            token: "operator.doc",
            regex: /[|:]/
        }, {
            token: "paren.doc",
            regex: /[\[\]]/
        }]
    };
    this.normalizeRules();
};

oop.inherits(DocCommentHighlightRules, TextHighlightRules);

DocCommentHighlightRules.getTagRule = function(start) {
    return {
        token : "comment.doc.tag.storage.type",
        regex : "\\b(?:TODO|FIXME|XXX|HACK)\\b"
    };
};

DocCommentHighlightRules.getStartRule = function(start) {
    return {
        token : "comment.doc", // doc comment
        regex : "\\/\\*(?=\\*)",
        next  : start
    };
};

DocCommentHighlightRules.getEndRule = function (start) {
    return {
        token : "comment.doc", // closing comment
        regex : "\\*\\/",
        next  : start
    };
};


exports.DocCommentHighlightRules = DocCommentHighlightRules;
