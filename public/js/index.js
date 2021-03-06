$(document).ready(function () {

// Get references to page elements
    var $titleSearchText = $("#searchTitle");
    var $submitTitleSearchButton = $("#submitSearchTitle");
    var $logParagraph = $("#log").hide();


// The searchAPI object contains methods for each kind of request we'll make
    var searchAPI = {
        searchByTitle: function (title) {
            return $.ajax({
                url: "/search-title/" + title,
                type: "GET"
            });
        }
    };


    var handleSubmitTitleSearch = function (event) {
        event.preventDefault();

        var searchTerm = $titleSearchText.val().trim();

        searchAPI.searchByTitle(searchTerm).then(function (resp) {

            var data = [];
            data[0] = ["ID", "Title", "Meta Description", "Meta Keywords", "Categories", "Tags", "Status"];
            var hitsArray = resp.hits.hits;
            hitsArray.forEach(function (eachArticle) {
                data.push([eachArticle._id, eachArticle._source['Title'], eachArticle._source['Meta Description'], eachArticle._source['Meta Keywords'], eachArticle._source['Categories'], eachArticle._source['Tags'], eachArticle._source['Status']]);
            });

            var articlesTable = makeTable($("#tableDiv"), data);
        });

        // Clear out search field
        $searchTitlesButton.val("");
    };


    function makeTable(container, data) {
        var table = $("<table/>").addClass('table table-striped');
        $.each(data, function (rowIndex, r) {

            var row = $("<tr/>");
            $.each(r, function (colIndex, c) {
                row.append($("<t" + (rowIndex == 0 ? "h" : "d") + "/>").text(c));
            });
            table.append(row);
        });
        return container.html(table);
    }

// Add event listeners to the submit button
    $submitTitleSearchButton.on("click", handleSubmitTitleSearch);
});