Pipe = Class{}

local PIPE_IMAGE = love.graphics.newImage('pipe.png')

-- Intitialize the object 
function Pipe:init(orientation, y)
    self.x = VIRTUAL_WIDTH
    self.y = y

    self.width = PIPE_WIDTH
    self.height = PIPE_HEIGHT

    -- orientation tells our code if its a top or bottom pipe
    self.orientation = orientation
end

function Pipe:update(dt)
    
end

function Pipe:render()
    love.graphics.draw(PIPE_IMAGE, self.x, 
        (self.orientation == 'top' and self.y + PIPE_HEIGHT or self.y), 
        0, -- rotation
        1, -- X scale
        self.orientation == 'top' and -1 or 1) -- Y scale
end