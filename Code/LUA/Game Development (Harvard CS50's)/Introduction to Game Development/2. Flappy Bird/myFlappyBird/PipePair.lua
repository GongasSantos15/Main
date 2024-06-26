PipePair = Class{}

-- Size of the gap between pipes
local GAP_HEIGHT = 90

function PipePair:init(y)
    -- Initialize pipes past the end of the screen
    self.x = VIRTUAL_WIDTH + 32

    self.y = y

    -- Instantiate 2 pipes that belong to this pair
    self.pipes = {
        ['upper'] = Pipe('top', self.y),
        ['lower'] = Pipe('bottom', self.y + PIPE_HEIGHT + GAP_HEIGHT)
    }

    -- Do this to avoid glitches when the pipes disappeared
    self.remove = false

    -- whether or not this pair of pipes has been scored
    self.scored = false
end

function PipePair:update(dt)
    -- Remove the pipe from the scene if it's beyond the left edge of the screen,
    -- Else move it from right to left
    if self.x > -PIPE_WIDTH then
        self.x = self.x - PIPE_SPEED * dt
        self.pipes['lower'].x = self.x
        self.pipes['upper'].x = self.x
    else
        self.remove = true
    end
end

function PipePair:render()
    for k, pipe in pairs(self.pipes) do
        pipe:render()
    end
end