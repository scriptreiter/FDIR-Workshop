// We may be able to drop the first param, but I'm leaving it for now
// It could be useful to allow us to kick a procedure off via the console
// by adding methods onto the controller object. Most of the stuff here
// will be automatic, on events, though
(function(controller, $, undefined) {
  $(document).ready(initAll);

  function initAll() {
    setupChannelTree();
    setupGraphs();
    setupCorrelationVector();
    setupCorrelationMatrix();

    setupPauseControl();

    timer.start(1000);
  }

  function setupChannelTree() {
    channel_tree.bind('#channel_tree');
    channel_tree.setup(800, 500);
    channel_tree.display(5000);// Right now this time is ignored
    setTimeout(
      function() {
        channel_tree.markFaulted('left_motor_voltage');
      },
      6000
    );
  }

  function setupPauseControl() {
    $('#pause_control').click(handlePauseControl);
  }

  function handlePauseControl() {
    var control = $('#pause_control');
    if(timer.isRunning()) {
      timer.pause();
      control.text('Restart');
    } else {
      timer.unpause();
      control.text('Pause');
    }
  }

  function setupGraphs() {
    graph_drawer.bind('#detail_graphs');

    graph_drawer.addGraph('sample_1');
    graph_drawer.addGraph('sample_2');

    timer.registerUpdater(graph_drawer.updateGraphs, 1000);// Probably will move this into graph_drawer
  }

  function setupCorrelationVector() {
    correlation_vector.bind('#correlation_vector');

    correlation_vector.setChannel('sample_1');

    timer.registerUpdater(correlation_vector.display, 10000);
  }

  function setupCorrelationMatrix() {
    correlation_matrix.bind('#correlation_matrix');
    correlation_matrix.setSize(720, 720);

    timer.registerUpdater(correlation_matrix.display, 10000);
  }

}(window.controller = window.controller || {}, jQuery));
